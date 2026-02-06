import httpx
from app.configs.config import Config

config = Config.from_env()

async def notify_slack(message: str):
    """Send a notification to Slack"""
    if not config.SLACK_WEBHOOK_URL:
        print("⚠️ SLACK_WEBHOOK_URL not configured")
        return

    payload = {"text": message}
    async with httpx.AsyncClient() as client:
        response = await client.post(config.SLACK_WEBHOOK_URL, json=payload)
        return response.status_code == 200
