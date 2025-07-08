# Note_app_automation
This repo consist the assessment for the note app automation done using cypress.

To setup this repo install all the dependencies such as npm, cypress, and other necessary packages

1. npm init -y
2. npm install cypress typescript --save-dev
3. npx tsc --init --types cypress --lib dom,es6 // this ensurse that types for cypress are accessible by typescript
4. npm i --save-dev cypress-mochawesome-reporter
5. Setup the code base as per the requirement

For github action setup
1. setup the github action by going to the actions page.
2. create a new workflow
3. connect the workflow with cypress cloud
4. Create a new project
5. Copy the project_id and record_id
6. create a yaml file. provide the project_id and record_id
7. For report generation give the read and write permission from repo action setting workflow.
8. Report will be generate in mochawesome index.html. (Or you can use other report generating package such as allure.)
