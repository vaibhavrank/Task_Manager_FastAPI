
# email_service.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from decouple import config
from datetime import datetime

SMTP_SERVER = config("SMTP_SERVER", default="smtp.gmail.com")
SMTP_PORT = config("SMTP_PORT", default=587, cast=int)
EMAIL_USER = config("EMAIL_USER", default="")
EMAIL_PASSWORD = config("EMAIL_PASSWORD", default="")

def send_email(to_email: str, subject: str, body: str):
    if not EMAIL_USER or not EMAIL_PASSWORD:
        print(f"Email not configured - would send: {subject} to {to_email}")
        return
    
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        print(f"Email sent successfully to {to_email}")
    except Exception as e:
        print(f"Failed to send email: {str(e)}")

def send_task_notification(email: str, task_title: str, action: str):
    subject = f"Task {action.title()}: {task_title}"
    body = f"""
    <html>
    <body>
        <h2>Task Manager Notification</h2>
        <p>Your task "<strong>{task_title}</strong>" has been {action}.</p>
        <p>Thank you for using Task Manager!</p>
    </body>
    </html>
    """
    send_email(email, subject, body)

def send_deadline_reminder(email: str, task_title: str, deadline: datetime):
    subject = f"Task Deadline Reminder: {task_title}"
    body = f"""
    <html>
    <body>
        <h2>Task Deadline Reminder</h2>
        <p>Your task "<strong>{task_title}</strong>" is due on {deadline.strftime('%Y-%m-%d %H:%M')}.</p>
        <p>Don't forget to complete it on time!</p>
    </body>
    </html>
    """
    send_email(email, subject, body)
