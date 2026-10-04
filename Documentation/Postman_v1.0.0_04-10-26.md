type: collection.insomnia.rest/5.0
name: Issue-Tracking
meta:
  id: wrk_6fbb6482624149619c4fd9d2ca16500b
  created: 1791011365422
  modified: 1791011394244
  description: ""
collection:
  - name: Users
    meta:
      id: fld_09695fa388014dfa8a5297206c54c625
      created: 1791011547646
      modified: 1791012584134
      sortKey: -1791011547646
      description: ""
    children:
      - url: http://localhost:3000/user/register
        name: Create a user
        meta:
          id: req_72e1b580326e451ab5734dae14c0a45c
          created: 1791011365792
          modified: 1791015527546
          isPrivate: false
          description: ""
          sortKey: -1791011557495
        method: POST
        body:
          mimeType: application/json
          text: |-
            {
              "email": "admin2@example.com",
              "first_name": "Admin",
              "last_name": "User",
              "phone": "+254798765432",
              "password": "Adm1nP@ssw0rd!",
              "role": "admin"
            }
        headers:
          - name: Content-Type
            value: application/json
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/user/login
        name: Login
        meta:
          id: req_5152d0edf6dd4a7c8739e4ba1b81d7d4
          created: 1791011982421
          modified: 1791012002992
          isPrivate: false
          description: ""
          sortKey: -1788736335674
        method: POST
        body:
          mimeType: application/json
          text: |-
            {
              "email": "admin2@example.com",
              "password": "Adm1nP@ssw0rd!"
            }
        headers:
          - name: Content-Type
            value: application/json
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/user
        name: Put a user
        meta:
          id: req_427cffd125a14404afc3702b61e1f0c0
          created: 1791012418789
          modified: 1791012609883
          isPrivate: false
          description: ""
          sortKey: -1789873946584.5
        method: PUT
        body:
          mimeType: application/json
          text: |-
            {
              "email": "admin3@example.com"
            }
        headers:
          - name: Content-Type
            value: application/json
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/user
        name: Delete user
        meta:
          id: req_aad946a11b9a4a3eb750b123f6dcf5ee
          created: 1791012790330
          modified: 1791012809457
          isPrivate: false
          description: ""
          sortKey: -1787598724763.5
        method: DELETE
        headers:
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/user/profile
        name: Get user
        meta:
          id: req_62509eb9a2714679b3d6aa286b23f8eb
          created: 1791014782198
          modified: 1791014820725
          isPrivate: false
          description: ""
          sortKey: -1790442752039.75
        method: GET
        headers:
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
    headers:
      - id: pair_5eca63e7b8fd4f208b827ba0c663cd58
        name: Authorization
        value: "{{token}}"
        description: ""
        disabled: false
  - name: Issues
    meta:
      id: fld_cc16214687f64373b8cd0b198c029d24
      created: 1791126279169
      modified: 1791126279169
      sortKey: -1788118917913.5
      description: ""
    children:
      - url: http://localhost:3000/issues/create
        name: Create a issues
        meta:
          id: req_8954d2d4d0b44284b99be20e21d5bfb1
          created: 1791126279178
          modified: 1791126599720
          isPrivate: false
          description: ""
          sortKey: -1791011557495
        method: POST
        body:
          mimeType: application/json
          text: >-
            {
              "title": "Login button not working on mobile",
              "description": "When tapping the login button on iOS Safari, nothing happens. Works fine on desktop.",
              "status": "open",
              "priority": "high",
              "assigned_to": "576078fb-3749-4540-bed9-bb8cb0c3d22b"
            }
        headers:
          - name: Content-Type
            value: application/json
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/issues/get/848e84b6-b883-4bf7-ae2a-e1b3de61c9de
        name: Get issues by id
        meta:
          id: req_0346511184e74c10a639a1d54f5c123d
          created: 1791126279193
          modified: 1791127760330
          isPrivate: false
          description: ""
          sortKey: -1788736335674
        method: GET
        headers:
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/issues/a91db60e-5abe-4096-9e1c-6f062e82e0e9
        name: Update Issues by id
        meta:
          id: req_7243e87ce302497c8e41d18db7d477b0
          created: 1791126279202
          modified: 1791127297557
          isPrivate: false
          description: ""
          sortKey: -1789873946584.5
        method: PUT
        body:
          mimeType: application/json
          text: |-
            {
              "title": "Login button not working on mobil"
            }
        headers:
          - name: Content-Type
            value: application/json
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/issues/a91db60e-5abe-4096-9e1c-6f062e82e0e9
        name: Delete  Issue
        meta:
          id: req_2f5f301c205a48d9b737b71ce78758ae
          created: 1791126279208
          modified: 1791127640713
          isPrivate: false
          description: ""
          sortKey: -1787598724763.5
        method: DELETE
        headers:
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/issues/created/423afe17-5657-4439-98c1-f652bfb44741
        name: Get Issues user created
        meta:
          id: req_7679723c11344208a222da851eb37c49
          created: 1791126279225
          modified: 1791127139093
          isPrivate: false
          description: ""
          sortKey: -1790442752039.75
        method: GET
        headers:
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/issues/assigned/576078fb-3749-4540-bed9-bb8cb0c3d22b
        name: Get Issues assigned to a user
        meta:
          id: req_dc4635fb11ee4a4084a4e03de21ac2a3
          created: 1791127163384
          modified: 1791127211000
          isPrivate: false
          description: ""
          sortKey: -1790158349312.125
        method: GET
        headers:
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
      - url: http://localhost:3000/issues/title?title=mobile
        name: Get issues by title (search)
        meta:
          id: req_9dfa31be32c949589fb5d0b9230d5eb6
          created: 1791127879363
          modified: 1791128055608
          isPrivate: false
          description: ""
          sortKey: -1788167530218.75
        method: GET
        headers:
          - name: User-Agent
            value: insomnia/11.6.2
        settings:
          renderRequestBody: true
          encodeUrl: true
          followRedirects: global
          cookies:
            send: true
            store: true
          rebuildPath: true
    headers:
      - id: pair_5eca63e7b8fd4f208b827ba0c663cd58
        name: Authorization
        value: "{{token}}"
        description: ""
        disabled: false
cookieJar:
  name: Default Jar
  meta:
    id: jar_35ffeb16a52180771ad09c3e35718a8f7909b559
    created: 1791011365449
    modified: 1791011365449
environments:
  name: Base Environment
  meta:
    id: env_35ffeb16a52180771ad09c3e35718a8f7909b559
    created: 1791011365435
    modified: 1791126590519
    isPrivate: false
  data:
    local: http://localhost:3000/
    token: Bearer
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyM2FmZTE3LTU2NTctNDQzOS05OGMxLWY2NTJiZmI0NDc0MSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc5MTEyNjU3MywiZXhwIjoxNzkxMTQwOTczfQ.wOg3ZqNDv0vXHh7yyhr4L84D5y1cHHw-NtEFJ854AH4
