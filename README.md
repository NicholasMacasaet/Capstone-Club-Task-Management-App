# This is the initial simulated proof of concept for the Streamline Task Management App for the APS490/CSC494 Capstone Course

## Demo Instructions
- link to demo: https://streamline-simulated-demo.netlify.app
- When loaded in, choose either the login and registration pages and just click on the login/register buttons, there is no actual login/registration functionality since this is a simulated prototype, each button just links to the next page in the workflow that a user would take for registration or login
- You will then be on the landing page for joining or creating an organization, like in the login/registration pages, choose either page and click on the join/creation buttons in order to be redirected to the main pages of the application
- Now you should be on the Task Dashboard. You can switch between clubs via the navigation bar on the bottom.
- To redirect to the Initiatives Dashboard, use the hamburger menu on the top right.
- To switch between logged in users, use the slider on the top right

## Definitions
- Tasks are structured units used to communicate responsibilities assigned to individual club executives. They support clear communication of what must be done, by whom, and by when. 
- Initiatives are higher-level organizational objects that group related tasks together with supporting information such as deadlines, descriptions, and attachments.
- Initiatives was adopted in place of Events following consultation with subject matter experts, who indicated that club operations extend beyond discrete events and require a broader representation of ongoing efforts. 

## Demo functionality 
- The user is able to view Tasks and Initiatives on the Task and Initiative Dashboards
- The user is also able to switch between clubs and logged in users, this is meant to demonstrate functionality of assigning Tasks or Initiatives to users and filtering different Tasks or Initiatives by clubs
- There is no server-side component, any data within this application is stored in the browser and is reset to its default state upon reloading the page.
- The purpose of this demo is to demonstrate the functionality of the deployed application and to serve as a model/reference for my groupmates to develop further

## Project Setup Instructions

### Frontend/Backend Setup
- First, clone the repository. You can use whatever method you prefer but I use github desktop since its easy.
- Open up the terminal in your editor. 
- Navigate to the root level of the directory and type `cd Task_Manager_Frontend` (for setting up Frontend) or `cd Task_Manager_Backend` to set up the frontend or backend of the application.
- You will need npm (Node Package Manager), so follow the installation guide [here](https://nodejs.org/en/download) for your respective machine and come back to this once you've done so.
- Once you've changed directories and are in either the respective frontend or backend directory, type `npm install` and any dependencies needed should be automatically downloaded to your local machine.

### IMPORTANT
- I've done this by mistake a handful of times but do NOT touch the .gitignore files and commit the node_modules folder or else hundreds of files will be committed and that'll be bad™
