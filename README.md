# Wikipedia Language Change Automation

## 1. About the Project
This project automates a test case for changing the language preference on Wikipedia. It uses the Playwright testing framework to perform end-to-end testing and verify that the language is successfully updated and the corresponding values are stored correctly in the browser's `localStorage`. The tests are executed in a Dockerized environment to ensure consistency and portability.

---

## 2. Automated Test Case

### **Test Case Name:**  
Successful language change in English Wikipedia by an authorized user.

### **Preconditions:**  
1. The user is already authorized in their English Wikipedia account.

### **Test Steps:**  
1. Click on account icon to open menu.
2. Navigate to the "Preferences" page.
3. Scroll down to "Internationalisation" section
4. Select a new language (e.g., Ukrainian) from the dropdown menu.
5. Save the changes by click on "Save" button

### **Expected Results:**
The interface renders on the selected language.

### **Postconditions:**
1. Scroll down to "Internationalisation" section
2. Change the language back to the default (English).
3. Save the changes by click on "Save" button

---

## 3. How to Use This Project

### **Prerequisites**
1. Install **Docker** and **Docker Compose** on your system:
   - Follow the instructions here: [Docker Installation Guide](https://docs.docker.com/get-docker/).
2. Clone this repository to your local machine:
   ```bash
   gh repo clone ArturBoychuk/wikipedia-test-task
   cd wikipedia-test-task
3. Create an `.env` file in the root of the project folder to store sensitive information by following command:
   - For Linux and MacOS:
      ```bash
      echo -e "BASE_URL=https://en.wikipedia.org\nUSER_NAME=<your_username>\nPASSWORD=<your_password>" > .env
   - For Windows(was not tested though):
      ```bash
      (echo BASE_URL=https://en.wikipedia.org && echo USER_NAME=<your_username> && echo PASSWORD=<your_password>) > .env
   - As the result you will have such data - plase fill it with your credentials:
     - BASE_URL=https://en.wikipedia.org
     - USER_NAME=<your_username>
     - PASSWORD=<your_password>
4. Build the Docker Image:
   - Run the following command to build the Docker image for this project:
   ```bash
   docker compose build
5. Run the Tests:
   - This command will:
     - Spin up the container.
     - Run the Playwright tests.
     - Generate an HTML report in the playwright-report folder.
   ```bash
   docker compose up
6. View the Last Test Report:
   ```bash
   open ./playwright-report/index.html
7. Clean Up:
   - After running the tests, you can remove the container using the following command:
   ```bash
   docker compose down
