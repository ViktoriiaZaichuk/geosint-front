![GeO’sint](/files/background.png)

![GeO’sint](/files/logo-geosint.png)

# GeO’sint - OSINT Challenge App


The project was developed collaboratively as part of our coursework at school O’clock with the aim of obtaining the "Concepteur Développeur d'Applications" title. Our primary objective was to apply our application development skills by creating a practical and functional application.

The GeO’sint application was specifically designed for OSINT enthusiasts, individuals who have a keen interest in Open Source Intelligence. This field encompasses a set of techniques that leverage freely available resources on the Internet. The application provided a recreational experience, where users could upload their own photos and specify the desired answer. It offered an enjoyable way to discover the location where a photo was taken by utilizing image-based resources and advanced search capabilities on the Internet. Challenges could be shared with the entire community or a select group of friends. While the target audience primarily consisted of OSINT enthusiasts, our ultimate goal was to make the application accessible to the general public. It was meticulously designed to appeal to individuals of various age groups and interests, combining elements of entertainment, education, and social interaction.

To ensure successful implementation, we divided the project into two main parts: frontend and backend. We used React for the frontend, allowing us to create an intuitive and visually appealing user interface. On the backend, we utilized Node.js with the Express framework to develop a robust and efficient REST API. For data storage, we chose PostgreSQL and used Sequelize as an ORM tool. This approach enabled us to create a well-rounded application that meets our objectives and provides a seamless user experience.


## Table of Contents
- [User Profiles](#user-profiles)
- [Functionalities](#functionalities)
- [Application Hierarchy](#application-hierarchy)
- [Entity-Relationship Diagram](#entity-relationship-diagram)
- [Pivot Tables Diagram](#pivot-tables-diagram)


## User Profiles

### Geek (Challenger)

Geeks on GeO’sint are OSINT enthusiasts who thrive on creating challenging puzzles, editing photos, and interacting with fellow players. Their passion lies in crafting intriguing OSINT challenges that stimulate and engage other users. Geeks are the driving force behind the diverse and captivating puzzles that make GeO’sint a dynamic and interactive experience.

### Noob (Joueur)

Noobs, or players, are new to the world of OSINT and aim to have fun while developing their investigative skills. They participate in OSINT challenges, discover new locations, and attempt to solve puzzles crafted by Geeks. Noobs can leverage the interactive features of the platform to learn and progress in their understanding of OSINT in a supportive and engaging environment.

By combining the profiles of Geeks and Noobs, GeO’sint strives to offer a rewarding and engaging experience for all users, whether they are seasoned experts or novices in the realm of OSINT.

![Persona](/files/persona.png)


## Functionalities

To ensure an optimal experience for users, players, and challengers, we've identified essential needs and corresponding functional responses. User stories drive the development of key features:

### Create an Account/Login

   - Create a registration form
   - Manage authentication system

### View Profile and Modify Password

   - Create a dedicated user profile management page

### Submit a New OSINT Challenge (Challenger)

   - Create a challenge submission form with answer, difficulty level, and photo upload

### View Created Challenges (Challenger)

   - Display a list of created challenges

### Respond to Challenges (Player)

   - Create a challenge response form
   - Bonus: Respond to challenges by positioning on a map (calculate distance based on answer coordinates)

### View Challenge Responses (Player)

   - Display correct/incorrect response messages
   - Bonus: Indicate if the response is warm or cold (based on answer accuracy percentage)

### View Challenge List

   - Display a list of challenges

### View General Ranking

   - Display a list of players and their respective points

### Bonus Functionalities

   - Find friends on the platform
   - Create game groups (public or private)
   - Filter challenges by difficulty and played/unplayed status
   - Download challenge photos
   - Comment under challenges
   - Notify group members when creating a challenge
   - Edit challenge photos
   - Choose a dark theme
   - Invite new players via email

![User stories](/files/user-stories.png)


## Application Hierarchy

Through user analysis and needs assessment, we visually crafted the application hierarchy to understand user preferences and expectations. This process was crucial in designing a seamless and intuitive user experience.

We devised a clear and logical navigation structure, prioritizing the most important features. The main pages of the application were organized based on their significance and relationship with other pages. Figma was employed for creating the schematics.

Explore the hierarchy to gain an overall view of the navigation and discover how key features are organized to provide an optimal user experience.

![Application Hierarchys](/files/arborescence.png)


## Entity-Relationship Diagram

The entity-relationship diagram was created to model the relationships between the "User," "Challenge," and "Group" entities within the application. It visualizes how users play challenges, create challenges and groups, and become members of different groups. Relationships between entities are depicted through foreign keys that establish links between records in the tables. This diagram aids in designing and organizing the database structure to account for various interactions between users, challenges, and groups in your application.

![Entity-Relationship Diagram](/files/diagramme-entite-relation.png)


## Pivot Tables Diagram

The Pivot Tables Diagram is created to model many-to-many relationships between the "User," "Challenge," and "Group" entities. It illustrates the connections between users and challenges, challenges and groups, as well as groups and users. This modeling simplifies the management of associations between these entities in the application and provides an optimized data structure for database operations.

![Pivot Tables Diagram](/files/diagramme-pivot-tables.png)