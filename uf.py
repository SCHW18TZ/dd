from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import asyncio
options = Options()
options.add_experimental_option('detach', True)

driver = webdriver.Chrome(service=Service(
    ChromeDriverManager().install()), options=options)

driver.maximize_window()


username = ''
password = 'schwitz'

while True:

    driver.get("https://github.com/SCHW18TZ")
    driver.refresh()