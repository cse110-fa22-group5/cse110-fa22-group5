<!-- Note taker: YOUR NAME HERE-->
<!-- Month Date, Year-->
# October 25, 2022 Meeting Minutes
​
<!-- XX:XX AM/PM -->
## Time
- Start: 2:00 PM for everyone
- End: 2:40 PM
​
<!-- TA or team, etc.-->
## Type of meeting: Project feedback and Starting Pitch discussion
​
<!-- [x] for present -->
## Attendance:
- [x] Yaya Jiang
- [ ] Kevin Lam
- [x] Aaryan Tiwary
- [x] Lauren Lee
- [x] Priya Senthilkumar
- [x] Duy Vu
- [x] Alex Zhang
- [x] Akanksha Pandey
- [ ] Zelong Zhou
- [ ] Guidong Luo
​
<!-- Topics for the meeting-->
# Agenda
- Discuss Note Taking App
- App's design
​
<!-- homework basically zzzz-->
# Things to do for next meeting:
- Start working on Staring Pitch
- Send presentation document to TA before the submission

​
<!-- what was discussed for each topic-->
# Main Ideas:
- Go over the Note Taking App ideas and p
- Prepare presentation slide for the starting pitch
- TA's feedback:
    - How to store notes locally and publicly?
    - How local dashboard relate to public dashboard
    - How do we define public notes 
    - How to control notes we want to see if we dont have the internet
    - Suppose making local notes public, then other users' device can fetch all notes from the database, hence being able to view all public notes
    - Expectation: everyone should be able to perform CRUD for note
    - Consider: 
        - Test cases
        - Finalize features
        - Consistent design and architecture (eg. public dashboard and local dashboard)
        - Allow users to CRUD images/pictures 
        - Avoid risks when uploading incompatible file extension (only allow some of file extension, e.g .png ,.pdf, etc)
        - How to make images publicly (store in the database)
        - What if images are improperly downloaded for other public users to view
    - How to define large set of notes (defined by labels, tags)
        - Risks: Name conflict (e.g CSE110 tags different from CSE_110 tags)
        - Possible solution: Generalize tags, ready-to-use list of tags
        - Ability to customize tag -> increases complexity for other public users to search
    - File system: good
    - Share note:
        - How to define:
            - Share note url, id
            - Only happen if we decide to publish that note
            - Be carefull of improperly uploading file extension
    - User authentication
        - How to login for local/public users?
        - How local user view public dashboard
            - Public dashboard requires authentication
            - Only verified users have the access to the database to fetch notes' data
        - Separate public dashboard and local dashboard

    - Making milestones for each feature
        - Separete milestone for local and publish dashboard
    
    - Finalize design, flow, and technologies before jumping on coding
    
    - Idea approved!
- Start working on Staring Pitch
    - Send to TA for approval


    

