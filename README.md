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

# CSS Deliverable

- Header, footer, and main content body
   - Login / Register boxes
   - Nav bar on Top
   - Footer info on bottom
   - Some items are centered to the page
- Navigation elements
   - nav bar
      - respond to resizing.
      - Change color on hover.
      - No underline on links
   - Login buttons
      - Rounded
      - Gradient
      - React to hover. 
- Responsive to window resizing
   - Home Page Centered Title (will be finished later when more functionality added to program) resizes title
   - nav bar resizes
   - header on top and footer on bottom and width of screen
- Application text content
   - Font,
      - size
      - color
      - Font
   - some text adjust to widow resize
   - text on about page
- Application images
   - Some stying on placeholder images for now in main page
   - When i get closer to finishing the application the placeholer images will be removed and javascript will replace the calender ui. However images will be placed on the home page as a showcase of the application and potentially on the about page. Also image if i mage a logo and will replace text in the top left corner of screen.
 
# React Deliverable

- Conversion to Vite
- React component functionality
   - Login / Current logged in user implemented
   - Basic Visualization of Calendar
- Router
   - app.jsx uses <BrowserRouter> to route page. Headr and Footer are reused between routes not duplicated
- Hooks
   - User name and logged in status saved in useState in login.jsx / app.jsx
   - Calendar in main.jsx uses useState hooks for dates

# Service Deliverable

- HTTP Service using Node.js and Express
- Front end using Express
- 3rd party api (temp quote api in the about page. ical api later)
- backend provides service points
    - Routes
    - Controllers
    - Services
    - service/index.js

- interactivity
    - user login, logout, and creation
    - calendar creation, sharing, retrivial, itegration in ui
    - event creation, retrival, integration in ui
    - calendar displays events
    - (dev) clear db button for easy testing on server

- locations of deliverable
    - Endpoints
        - service/index.js (set url location per endpoint)
        - service/routes (decouple json from code)
        - service/controllers (run the logic of endpoint)
        - service/services (decouple database access / structure)
        - service/middleware (wip)
    - Endpoint Calls
        - src/Requests (functions to call endpoints)

# login deliverable
- now on db
   - login
   - register
   - logout
   - events
   - calendars
- functionality based on registration
   - login
   - logout
   - create cal
   - create event for cal
   - share calendar 

# WebSocket Deliverable
- Websocket used to show live updates of adding new events on shared calendars (unfortunatly sharing calendar does not automatically show)
    - EX
        - create userA
        - create userB
            - create calendar "B"
            - Share calendar "B" to "userA"
        - logout and relogin "userA"
        - Calendar "B" should now show for "userA" as a shared calendar
        - With "userB" add an event to shared calendar "B"
        - "userA" should recieve a message "New Event" which refreshes the calendar to diplay the new event

        