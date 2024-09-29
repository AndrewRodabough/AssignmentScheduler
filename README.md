# startup
CS 260 web programming

# Specification Deliverable

## The Pitch
A scheduling app that helps you plan out your availability and your assignments. I personally struggle with mapping out assignment and project deadlines as well as finding time for studying for upcoming exams. the site aims to provide a space to put all your assignments and events in one place, and be able to easily view and plan your time. The site also aims to allow you to easily share and collaberate events and plans with other people.

## Key Features
* store and edit events, assignments, exams, and dates in a cal
* Various layouts to visualize deadlines, and events
* tracking time needed for completion of assignments to facilitate planning ahead
* sharing of events, dates, and deadlines with other users
* integration with live ical or google cal feeds
* mobile and pc support

## Use of technology
* HTML - login page, calendar page
* CSS - formatting for pc and mobile
* JavaScript - login, add and edit, and update events, call backend endpoints 
* React - visualization of schedule and events, allows user to interact with schedule and see multiple views of the data
* Web Service - 
    * login / auth
    * change any settings
    * api calls to ical / google cal
* Database Data / Auth
    * store schedules
    * store user data
    * store authtokens
* Websocket data
    * add events
    * edit events
    * update events
    * brodcast schedule updates to other users
 ![Screenshot (109)](https://github.com/user-attachments/assets/9e91dabf-7850-4d82-8069-57982c5afe08)

# HTML Deliverable

- HTML (3 pages):
    - login
        - login or register
    - about
        - will contain info about the project as development continues
    - appMain
        - main page for interaction
        - view calendar
        - add events
        - share calendar
        - logout
- Links
    - temp navigation links at the top for quickly changing between pages during development
    - login and register link to main page
    - logout links to login page
    - about and git hub link at bottom
- Text
    - a description is present (placeholder) for every calendar event
- 3rd party calls
    - calendars that link to ical feed
- images
    - placeholder images for now
    - logo and artwork on login page and main page
- login placeholder
    - login and register in login page
    - username displayed at bottom of main page
    - ui icons
- database data
    - calendar data is stored on a database
- websocket data
    - live calendar update on shared calendars / ical feel

