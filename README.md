# NotionGPT: Push and Pull Content from Your Notion Workspace with ChatGPT 🔥
Ever wished you could create Notion pages from ChatGPT? Have you wondered if there's an easy way your ChatGPT could be in sync with knowledge files in your Notion Workspace? 👀 Well, look no more! 

## Demo
https://github.com/user-attachments/assets/3713f886-cd77-49c5-b223-89a4942a4068

## Quickstart
### Setup for ChatGPT
1. Create a custom GPT and click ***Create new action***
2. Go to `https://notion-chatgpt.vercel.app` and click the copy button to get the `Import URL`.
3. Click "Authentication" and select `API-Key` using the `Bearer` authentication method
4. Head over to Notion Integrations and copy over your API-Key
5. Ensure this key has access to the workspace pages & databases you'd like to reference / update

## Raw Notion OpenAPI spec
Alternatively, you could copy this raw YAML (~500 lines)
```yaml
openapi: 3.1.0
info:
  title: Notion API
  description: API for interacting with Notion resources such as pages and databases.
  version: 1.0.0
servers:
  - url: https://api.notion.com/v1
    description: Main API server
paths:
  /pages/{page_id}:
    get:
      operationId: getPage
      summary: Retrieve a page by its ID.
      parameters:
        - name: page_id
          in: path
          required: true
          description: The ID of the page to retrieve.
          schema:
            type: string
            format: uuid
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
      responses:
        "200":
          description: A JSON object representing the page.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Page"
    patch:
      operationId: updatePage
      summary: Update a page by its ID.
      parameters:
        - name: page_id
          in: path
          required: true
          description: The ID of the page to update.
          schema:
            type: string
            format: uuid
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PageUpdate"
      responses:
        "200":
          description: The updated page.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Page"
  /pages:
    post:
      operationId: createPage
      summary: Create a new page.
      description: Creates a new page that is a child of an existing page or database.
      parameters:
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PageCreate"
      responses:
        "200":
          description: A JSON object representing the newly created page.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Page"
  /databases/{database_id}:
    get:
      operationId: getDatabase
      summary: Retrieve a database by its ID.
      parameters:
        - name: database_id
          in: path
          required: true
          description: The ID of the database to retrieve.
          schema:
            type: string
            format: uuid
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
      responses:
        "200":
          description: A JSON object representing the database.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Database"
  /databases/{database_id}/query:
    post:
      operationId: queryDatabase
      summary: Query a database.
      parameters:
        - name: database_id
          in: path
          required: true
          description: The ID of the database to query.
          schema:
            type: string
            format: uuid
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/DatabaseQuery"
      responses:
        "200":
          description: The query results.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/DatabaseRecord"
  /search:
    post:
      operationId: search
      summary: Search all pages and databases.
      parameters:
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SearchRequest"
      responses:
        "200":
          description: The search results.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SearchResponse"
  /users:
    get:
      operationId: listUsers
      summary: List all users in the workspace.
      parameters:
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
      responses:
        "200":
          description: A list of users.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"
  /blocks/{block_id}/children:
    get:
      operationId: getPageOrBlockChildrenContent
      summary: Retrieve the children of a block. Pages are also considered blocks.
      parameters:
        - name: block_id
          in: path
          required: true
          description: The ID of the block or page to retrieve children from.
          schema:
            type: string
            format: uuid
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
        - name: start_cursor
          in: query
          required: false
          description: The cursor to start from for pagination.
          schema:
            type: string
        - name: page_size
          in: query
          required: false
          description: The number of results to return per page.
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 100
      responses:
        "200":
          description: A paginated list of child block objects.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BlockChildren"
    patch:
      operationId: appendBlockChildren
      summary: Append new content to a block.
      parameters:
        - name: block_id
          in: path
          required: true
          description: The ID of the block to append content to.
          schema:
            type: string
            format: uuid
        - name: Notion-Version
          in: header
          required: true
          description: Notion API version
          schema:
            type: string
            default: "2022-06-28"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                children:
                  type: array
                  items:
                    $ref: "#/components/schemas/Block"
                after:
                  type: string
                  description: The ID of the existing block that the new block should be appended after.
      responses:
        "200":
          description: A paginated list of newly created first level children block objects.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BlockChildren"
components:
  headers:
    NotionVersion:
      required: true
      schema:
        type: string
        default: "2022-06-28"
      description: Notion API version
  schemas:
    Page:
      type: object
      required:
        - object
        - id
        - properties
      properties:
        object:
          type: string
          enum:
            - page
        id:
          type: string
          format: uuid
        properties:
          type: object
          additionalProperties: true
    PageUpdate:
      type: object
      properties:
        properties:
          type: object
          properties:
            Done:
              type: object
              required:
                - checkbox
              properties:
                checkbox:
                  type: boolean
                  const: true
                  example: true
          additionalProperties: true
    PageCreate:
      type: object
      required:
        - parent
        - properties
      properties:
        parent:
          type: object
          required:
            - database_id
          properties:
            database_id:
              type: string
              format: uuid
        properties:
          type: object
          properties:
            title:
              type: array
              items:
                type: object
                properties:
                  text:
                    type: object
                    properties:
                      content:
                        type: string
          additionalProperties: true
        children:
          type: array
          items:
            type: object
            additionalProperties: true
        icon:
          type: object
          properties:
            emoji:
              type: string
        cover:
          type: object
          properties:
            external:
              type: object
              properties:
                url:
                  type: string
                  format: uri
    Database:
      type: object
      required:
        - object
        - id
      properties:
        object:
          type: string
          enum:
            - database
        id:
          type: string
          format: uuid
        properties:
          type: object
          additionalProperties: true
    User:
      type: object
      required:
        - object
        - id
      properties:
        object:
          type: string
          enum:
            - user
        id:
          type: string
          format: uuid
        name:
          type: string
        avatar_url:
          type: string
          format: uri
    BlockChildren:
      type: array
      items:
        $ref: "#/components/schemas/Block"
    Block:
      type: object
      required:
        - object
        - id
      properties:
        object:
          type: string
          enum:
            - block
        id:
          type: string
          format: uuid
        type:
          type: string
        block_data:
          type: object
          additionalProperties: true
    Comment:
      type: object
      required:
        - object
        - id
      properties:
        object:
          type: string
          enum:
            - comment
        id:
          type: string
          format: uuid
        parent:
          type: object
          additionalProperties: true
        content:
          type: string
    PagePropertyItem:
      type: object
      required:
        - object
        - id
      properties:
        object:
          type: string
          enum:
            - property_item
        id:
          type: string
          format: uuid
        property_data:
          type: object
          additionalProperties: true
    DatabaseQuery:
      type: object
      properties:
        filter:
          type: object
          additionalProperties: true
        sorts:
          type: array
          items:
            type: object
            additionalProperties: true
    DatabaseRecord:
      type: object
      required:
        - object
        - id
      properties:
        object:
          type: string
          enum:
            - database_record
        id:
          type: string
          format: uuid
        record_data:
          type: object
          additionalProperties: true
    SearchRequest:
      type: object
      properties:
        query:
          type: string
        sort:
          type: object
          additionalProperties: true
    SearchResponse:
      type: array
      items:
        $ref: "#/components/schemas/SearchResult"
    SearchResult:
      type: object
      required:
        - object
        - id
      properties:
        object:
          type: string
          enum:
            - search_result
        id:
          type: string
          format: uuid
        result_data:
          type: object
          additionalProperties: true
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
security:
  - BearerAuth: []

```
