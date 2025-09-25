from bs4 import BeautifulSoup
import requests
import re

# Instagram URL
URL = "https://www.instagram.com/{}/"

def scrape_instagram(username):
    result = {
        "exists": False,
        "private": None,
        "followers": None,
        "following": None,
        "posts": None
    }

    try:
        r = requests.get(URL.format(username))
        soup = BeautifulSoup(r.text, "html.parser")

        # 1️⃣ Check if the user exists using og:description
        meta = soup.find("meta", property="og:description")
        if meta:
            result["exists"] = True
            content = meta.attrs['content']

            # Parse followers, following, posts
            parts = content.split("-")[0].split()
            if len(parts) >= 5:
                result["followers"] = parts[0]
                result["following"] = parts[2]
                result["posts"] = parts[4]

        # 2️⃣ Check if the account is private using h2 text
        private_tag = soup.find("h2", string=re.compile("This account is private", re.I))
        if private_tag:
            result["private"] = True
        elif result["exists"]:
            result["private"] = False

    except Exception as e:
        print(f"Error: {e}")

    return result

# Example usage
if __name__ == "__main__":
    username = "instagram"  # change to test
    data = scrape_instagram(username)
    print(data)
