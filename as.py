from datetime import datetime, timedelta


ontem = datetime.today() - timedelta(days=1)

print(datetime.today() < ontem)