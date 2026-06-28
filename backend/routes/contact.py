from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db
from schemas.contact import ContactSubmission
import models
import smtplib
from email.mime.text import MIMEText
import os

router = APIRouter()

@router.post('/contact')
async def submit_contact(data: ContactSubmission, db: Session = Depends(get_db)):
    # 1. Log to console
    print(f'[Contact Form] From: {data.name} <{data.email}>')
    
    # 2. Persist to PostgreSQL database
    submission = models.Submission(
        name=data.name,
        email=data.email,
        company=data.company,
        service=data.service,
        budget=data.budget,
        message=data.message
    )
    db.add(submission)
    db.commit()

    # 3. Optional: send email via SMTP (configure env vars SMTP_HOST, SMTP_USER, SMTP_PASS)
    try:
        smtp_host = os.getenv('SMTP_HOST')
        smtp_user = os.getenv('SMTP_USER')
        smtp_pass = os.getenv('SMTP_PASS')
        if smtp_host and smtp_user and smtp_pass:
            body = (
                f'Name: {data.name}\n'
                f'Email: {data.email}\n'
                f'Company: {data.company}\n'
                f'Service: {data.service}\n'
                f'Budget: {data.budget}\n\n'
                f'Message:\n{data.message}'
            )
            msg = MIMEText(body)
            msg['Subject'] = f'New enquiry from {data.name} — EskeeWalker'
            msg['From'] = smtp_user
            msg['To'] = 'eskeewalkerstrategies@gmail.com'
            with smtplib.SMTP_SSL(smtp_host, 465) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, ['eskeewalkerstrategies@gmail.com'], msg.as_string())
    except Exception as e:
        print(f'[Email error] {e}')

    return JSONResponse({'status': 'ok', 'message': 'Submission received and saved'})
