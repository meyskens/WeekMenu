#!/var/www/html/warre.site/api/.env/bin/python3.7

import requests
import json

headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}


menu = requests.get("https://tmmenumanagement.azurewebsites.net/api/WeekMenu/Geel", headers=headers).json()

# Remove backslash and format
menuFormat = json.dumps(json.JSONDecoder().decode(menu), indent=1)

# convert to json
menu = json.loads(menuFormat)[0]

items = menu["items"]
categories = menu["categories"]
location = menu["kitchen"]["Campus"]
fullMenu = {}

for language in ["NL", "EN"]:
    weekFull = {}
    for category in categories:
        week = {}
        days = items[category]
        for day in days:
            week.update({day : days[day]["ShortDescription" + language]})
        weekFull.update({categories[category]["Name" + language] : week})
    fullMenu.update({language : weekFull})

fullMenu.update({"weeknr" : menu["weeknr"]})
fullMenu.update({"location" : location})

print("Content-Type: application/json\n\n")
print(json.dumps(fullMenu, indent=1))
