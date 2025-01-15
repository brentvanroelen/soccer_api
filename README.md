# Soccer API

This API was created to manage football players and teams, allowing you to add players to teams and retrieve data. Teams and players are managed using tools like Postman.

## Features
- **Add players to teams**
- **Create teams**
- **Create players**
- **Retrieve team and player data**
- **Search functionality** (included but currently non-functional)

### Why this API?
This project was inspired by my passion for football, providing a straightforward way to manage and display player and team information.

## API Endpoints

### 1. Add Players (POST)
**Endpoint:** `/players`

**Sample request body:**
```json
{
  "id": 1,
  "name": "John Doe",
  "position": "keeper",
  "age": 25,
  "teamId": 1
}
```

### 2. Add Teams (POST)
**Endpoint:** `/teams`

**Sample request body:**
```json
{
  "id": 1,
  "name": "FC Example",
  "country": "Belgium",
  "founded": 1900,
  "stadium": "Example Stadium"
}
```

### 3. Search Functionality
Although present in the code, this feature is currently non-functional.

## Running the API
To start the server, use the following command:
```bash
npm install
node server.js
```

## Useful References
- **Database and connection setup:** [ChatGPT setup link](https://chatgpt.com/share/676a8ba7-f63c-8011-aee8-d3ba4c6f82eb)
- **Route debugging:** [ChatGPT debugging link](https://chatgpt.com/share/676a96a3-778c-8011-aeee-bc625ea56090)
- **Initial idea for a Recipe API (not used):** [Link to idea](https://chatgpt.com/share/678785c2-b49c-8011-87f4-6fd8fdbb6d24)
- **Express documentation:** [Express.js documentation](https://expressjs.com)
- **Additional brainstorming sessions:** [Brainstorming link](https://chatgpt.com/share/67878653-51dc-8011-827f-5530d5c07b17)
- **Search functionality debugging:** [Debugging link](https://chatgpt.com/share/678789cb-f3d8-8011-af29-6237ec874985)

## Future Improvements
- Implement a fully functional search feature.
- Add improved error handling and validation.

## Notes
- This project uses Express.js.
- Sample data is for illustration only; use unique IDs when creating players and teams.

Enjoy exploring the Soccer API!

