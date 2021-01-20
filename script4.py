import sys
import requests
url = 'https://docs.google.com/forms/d/e/1FAIpQLSeYCAw1tlR4lf5wE-gPsMP57ZWdbQwO5X0RY7eslBip1_d5lw/formResponse'
i = 1
students = [{"name": "hari kanani", "enroll" : "186120316025", "sem": "6"}, {"name": "keval Vavaliya", "enroll" : "186120316019", "sem": "6"}, {"name": "abhi goyani", "enroll" : "186120316019", "sem": "6"}, {"name": "nayan", "enroll" : "186120316023", "sem": "6"}, ]
for el in students:
    form_data = {
        'entry.765629789': el["enroll"],
        'entry.1127240383': el["name"],
        'entry.1946375607': el["sem"],
        'draftResponse':[],
        'pageHistory':0
    }
    user_agent = {'Referer':'https://docs.google.com/forms/d/e/1FAIpQLSeYCAw1tlR4lf5wE-gPsMP57ZWdbQwO5X0RY7eslBip1_d5lw/viewform','User-Agent': "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36"}
    r = requests.post(url, data=form_data,headers=user_agent)
    print(r)
    sys.stdout.flush()