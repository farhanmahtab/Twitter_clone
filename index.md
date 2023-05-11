
# Twitter Clone



<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->
1. [Get messages using senderId & receiverId](#1-get-messages-using-senderid--receiverid)
   1. [Success](#i-example-request-success)
1. [Delete notification](#2-delete-notification)
   1. [Success](#i-example-request-success-1)
1. [Search users in messages](#3-search-users-in-messages)
   1. [Success](#i-example-request-success-2)
1. [Post  Retweet](#4-post--retweet)
   1. [Success](#i-example-request-success-3)
   1. [Error](#ii-example-request-error)
   1. [Error(user not found)](#iii-example-request-erroruser-not-found)
1. [Create Reply](#5-create-reply)
   1. [Success](#i-example-request-success-4)
   1. [Error(uesr not found)](#ii-example-request-erroruesr-not-found)
   1. [Error(post not found)](#iii-example-request-errorpost-not-found)
   1. [Error(comment not found)](#iv-example-request-errorcomment-not-found)
1. [Get Replies](#6-get-replies)
   1. [Success](#i-example-request-success-5)
   1. [Error](#ii-example-request-error-1)
1. [Get Follwoing by userId](#7-get-follwoing-by-userid)
   1. [Success](#i-example-request-success-6)
1. [Get followers by userId](#8-get-followers-by-userid)
   1. [Success](#i-example-request-success-7)
1. [follow/unfollow user by ID](#9-followunfollow-user-by-id)
   1. [success(follow)](#i-example-request-successfollow)
   1. [success(unfollow)](#ii-example-request-successunfollow)
   1. [error](#iii-example-request-error)
1. [Post a comment](#10-post-a-comment)
   1. [Success](#i-example-request-success-8)
   1. [Error](#ii-example-request-error-2)
1. [Get comments](#11-get-comments)
   1. [Success](#i-example-request-success-9)
   1. [Error](#ii-example-request-error-3)
1. [Like/unlike a post](#12-likeunlike-a-post)
   1. [Like a post](#i-example-request-like-a-post)
   1. [Unlike a post](#ii-example-request-unlike-a-post)
1. [Delete a post](#13-delete-a-post)
   1. [Success](#i-example-request-success-10)
   1. [Error](#ii-example-request-error-4)
1. [Patch Post](#14-patch-post)
   1. [Success](#i-example-request-success-11)
   1. [Error](#ii-example-request-error-5)
1. [Post a tweet](#15-post-a-tweet)
   1. [Success](#i-example-request-success-12)
1. [Get posts by user Id](#16-get-posts-by-user-id)
   1. [Success](#i-example-request-success-13)
   1. [Error](#ii-example-request-error-6)
1. [Get post by id](#17-get-post-by-id)
   1. [Success](#i-example-request-success-14)
   1. [Error](#ii-example-request-error-7)
1. [Get all post](#18-get-all-post)
   1. [Success](#i-example-request-success-15)
   1. [Error](#ii-example-request-error-8)
1. [patch user by id](#19-patch-user-by-id)
   1. [Success](#i-example-request-success-16)
   1. [Error](#ii-example-request-error-9)
1. [Post  a User](#20-post--a-user)
   1. [Success](#i-example-request-success-17)
   1. [Error](#ii-example-request-error-10)
1. [Get User by Id](#21-get-user-by-id)
   1. [Success](#i-example-request-success-18)
   1. [Error](#ii-example-request-error-11)
1. [Get all user](#22-get-all-user)
   1. [Success](#i-example-request-success-19)



## Endpoints


--------



### 1. Get messages using senderId & receiverId



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/v2/messages
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| senderId | 643cfecc5d86196c2b7b23df |  |
| receiverId | 642e6248e538c6d0b0a11601 |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| senderId | 642bbcee54dcd68c01c9dccb |  |
| receiverId | 64227c2cac613fcee5f0ac31 |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "_id": "64534b1a08a9fba1b4e0483a",
    "cus_id": "642bbcee54dcd68c01c9dccb64227c2cac613fcee5f0ac31",
    "notification": false,
    "sender": "642bbcee54dcd68c01c9dccb",
    "receiver": "64227c2cac613fcee5f0ac31",
    "messages": [
        {
            "sender": "642bbcee54dcd68c01c9dccb",
            "receiver": "64227c2cac613fcee5f0ac31",
            "senderUsername": "heromaruf",
            "senderEmail": "maruf@gmail.com",
            "receiverUsername": "ironblood",
            "receiverEmail": "mahi@gmail.com",
            "body": "hello",
            "seen": false,
            "_id": "64534b1a08a9fba1b4e0483b",
            "createdAt": "2023-05-04T06:05:14.696Z"
        },
        {
            "sender": "64227c2cac613fcee5f0ac31",
            "receiver": "642bbcee54dcd68c01c9dccb",
            "senderUsername": "ironblood",
            "senderEmail": "mahi@gmail.com",
            "receiverUsername": "heromaruf",
            "receiverEmail": "maruf@gmail.com",
            "body": "hi",
            "seen": false,
            "_id": "64534b2808a9fba1b4e04865",
            "createdAt": "2023-05-04T06:05:28.318Z"
        },
        {
            "sender": "64227c2cac613fcee5f0ac31",
            "receiver": "642bbcee54dcd68c01c9dccb",
            "senderUsername": "ironblood",
            "senderEmail": "mahi@gmail.com",
            "receiverUsername": "heromaruf",
            "receiverEmail": "maruf@gmail.com",
            "body": "hello",
            "seen": false,
            "_id": "6453558608a9fba1b4e04ffa",
            "createdAt": "2023-05-04T06:49:42.460Z"
        },
        {
            "sender": "642bbcee54dcd68c01c9dccb",
            "receiver": "64227c2cac613fcee5f0ac31",
            "senderUsername": "heromaruf",
            "senderEmail": "maruf@gmail.com",
            "receiverUsername": "ironblood",
            "receiverEmail": "mahi@gmail.com",
            "body": "test",
            "seen": false,
            "_id": "64535eac08a9fba1b4e05093",
            "createdAt": "2023-05-04T07:28:44.957Z"
        }
    ],
    "createdAt": "2023-05-04T06:05:14.697Z",
    "updatedAt": "2023-05-04T07:28:44.959Z",
    "__v": 3
}
```


***Status Code:*** 200

<br>



### 2. Delete notification



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/users/getNotification
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64226c35f1b98662c7301067 |  |
| sender | 64227c2cac613fcee5f0ac31 |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64226c35f1b98662c7301067 |  |
| sender | 64227c2cac613fcee5f0ac31 |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "msg": "Notifications deleted successfully"
}
```


***Status Code:*** 200

<br>



### 3. Search users in messages



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/messages/searchUser
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| search | mahi |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| search | mahi |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "success": true,
    "type": "Search",
    "status": 200,
    "message": "OK",
    "users": [
        {
            "_id": "64227c2cac613fcee5f0ac31",
            "name": "Farhan Mahtab",
            "username": "ironblood",
            "email": "mahi@gmail.com",
            "profilePicture": "/Resource/pp.jpeg"
        },
        {
            "_id": "64268101b4407e69dc71d1f2",
            "name": "Mahi",
            "username": "Mahi Mahi",
            "email": "Mahi@gmail.com",
            "profilePicture": ""
        },
        {
            "_id": "642ce11e16b840aab116ec63",
            "name": "Farhan Mahtab Mahi",
            "username": "Farhan Mahtab Mahi",
            "email": "farhan.mahi1999@gmail.com",
            "profilePicture": "https://avatars.githubusercontent.com/u/51365144?v=4"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 4. Post  Retweet



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/post/retweet
```



***Body:***

```js        
{
    "email": "maruf@gmail.com",
    "postId": "6453824308a9fba1b4e06061",
    "postBody": "Rwe tweet"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "email": "maruf@gmail.com",
    "postId": "6453824308a9fba1b4e06061",
    "postBody": "Rwe tweet"
}
```



#### I. Example Response: Success
```js
{
    "success": true,
    "type": "Retweet",
    "status": 201,
    "message": "Retweet created successfully",
    "data": {
        "_id": "6453824308a9fba1b4e06061",
        "createdBy": "6453780408a9fba1b4e05e8a",
        "body": "post Toast",
        "PostImage": null,
        "react": [],
        "NumberOfReact": 0,
        "NumberOfRetweet": 1,
        "createdAt": "2023-05-04T10:00:35.814Z",
        "updatedAt": "2023-05-07T15:18:17.744Z",
        "comments": [
            {
                "createdBy": "64226c35f1b98662c7301067",
                "body": "toast",
                "createdAt": "2023-05-04T18:01:07.080Z",
                "updatedAt": "2023-05-04T18:01:07.080Z",
                "react": [],
                "NumberOfReact": 0,
                "_id": "6453f2e38b9ac3c6ba483d85",
                "replies": []
            },
            {
                "createdBy": "64227c2cac613fcee5f0ac31",
                "body": "Post Comment",
                "createdAt": "2023-05-07T14:26:37.031Z",
                "updatedAt": "2023-05-07T14:26:37.031Z",
                "react": [],
                "NumberOfReact": 0,
                "_id": "6457b51dbf7ddc990a0a6ebc",
                "replies": [
                    {
                        "createdBy": "64227c2cac613fcee5f0ac31",
                        "body": "reply",
                        "createdAt": "2023-05-07T15:10:41.448Z",
                        "updatedAt": "2023-05-07T15:10:41.448Z",
                        "_id": "6457bf71bf7ddc990a0a74d1"
                    }
                ]
            }
        ],
        "retweets": [
            {
                "typeofTweet": "retweet",
                "post": "6457c139bf7ddc990a0a761b",
                "createdBy": "642bbcee54dcd68c01c9dccb",
                "_id": "6457c139bf7ddc990a0a761d"
            }
        ],
        "__v": 4
    }
}
```


***Status Code:*** 201

<br>



#### II. Example Request: Error



***Body:***

```js        
{
    "email": "maruf@gmail.com",
    "postId": "6453824308a9fba1b4e0606",
    "postBody": "Rwe tweet"
}
```



#### II. Example Response: Error
```js
{
    "success": false,
    "status": 400,
    "message": "Bad request",
    "error": "Cast to ObjectId failed for value \"6453824308a9fba1b4e0606\" (type string) at path \"_id\" for model \"Posts\""
}
```


***Status Code:*** 400

<br>



#### III. Example Request: Error(user not found)



***Body:***

```js        
{
    "email": "maru@gmail.com",
    "postId": "6453824308a9fba1b4e06061",
    "postBody": "Rwe tweet"
}
```



#### III. Example Response: Error(user not found)
```js
{
    "success": false,
    "status": 404,
    "message": "User not found"
}
```


***Status Code:*** 404

<br>



### 5. Create Reply



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/post/comments/reply
```



***Body:***

```js        
{
    "email": "mahi@gmail.com",
    "postId": "6433d1de9c917bf6515f9ac3",
    "commentId":"6434d572d8d959a0bcdef9fe",
    "body": "reply 3"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "email": "mahi@gmail.com",
    "postId": "6453824308a9fba1b4e06061",
    "commentId":"6457b51dbf7ddc990a0a6ebc",
    "body": "reply"
}
```



#### I. Example Response: Success
```js
{
    "success": true,
    "type": "Reply",
    "status": 201,
    "message": "Reply Created",
    "post": {
        "_id": "6453824308a9fba1b4e06061",
        "createdBy": "6453780408a9fba1b4e05e8a",
        "body": "post Toast",
        "PostImage": null,
        "react": [],
        "NumberOfReact": 0,
        "NumberOfRetweet": 0,
        "createdAt": "2023-05-04T10:00:35.814Z",
        "updatedAt": "2023-05-07T15:10:41.458Z",
        "comments": [
            {
                "createdBy": "64226c35f1b98662c7301067",
                "body": "toast",
                "createdAt": "2023-05-04T18:01:07.080Z",
                "updatedAt": "2023-05-04T18:01:07.080Z",
                "react": [],
                "NumberOfReact": 0,
                "_id": "6453f2e38b9ac3c6ba483d85",
                "replies": []
            },
            {
                "createdBy": "64227c2cac613fcee5f0ac31",
                "body": "Post Comment",
                "createdAt": "2023-05-07T14:26:37.031Z",
                "updatedAt": "2023-05-07T14:26:37.031Z",
                "react": [],
                "NumberOfReact": 0,
                "_id": "6457b51dbf7ddc990a0a6ebc",
                "replies": [
                    {
                        "createdBy": "64227c2cac613fcee5f0ac31",
                        "body": "reply",
                        "createdAt": "2023-05-07T15:10:41.448Z",
                        "updatedAt": "2023-05-07T15:10:41.448Z",
                        "_id": "6457bf71bf7ddc990a0a74d1"
                    }
                ]
            }
        ],
        "retweets": [],
        "__v": 3
    }
}
```


***Status Code:*** 201

<br>



#### II. Example Request: Error(uesr not found)



***Body:***

```js        
{
    "email": "mah@gmail.com",
    "postId": "6453824308a9fba1b4e06061",
    "commentId":"6457b51dbf7ddc990a0a6ebc",
    "body": "reply"
}
```



#### II. Example Response: Error(uesr not found)
```js
{
    "success": false,
    "status": 404,
    "message": "User not found"
}
```


***Status Code:*** 404

<br>



#### III. Example Request: Error(post not found)



***Body:***

```js        
{
    "email": "mahi@gmail.com",
    "postId": "6453824308a9fba1b4e0606",
    "commentId":"6457b51dbf7ddc990a0a6ebc",
    "body": "reply"
}
```



#### III. Example Response: Error(post not found)
```js
{
    "success": false,
    "type": "Reply",
    "status": 400,
    "message": "Bad Request",
    "error": "Cast to ObjectId failed for value \"6453824308a9fba1b4e0606\" (type string) at path \"_id\" for model \"Posts\""
}
```


***Status Code:*** 400

<br>



#### IV. Example Request: Error(comment not found)



***Body:***

```js        
{
    "email": "mahi@gmail.com",
    "postId": "6453824308a9fba1b4e06061",
    "commentId":"6457b51dbf7ddc990a0a6eb",
    "body": "reply"
}
```



#### IV. Example Response: Error(comment not found)
```js
{
    "success": false,
    "status": 404,
    "message": "Comment not found"
}
```


***Status Code:*** 404

<br>



### 6. Get Replies



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/post/comments/reply
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| commentId | 6457b51dbf7ddc990a0a6ebc |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| commentId | 6457b51dbf7ddc990a0a6ebc |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "type": "Reply",
    "status": 200,
    "message": "OK",
    "comment": {
        "_id": "6453824308a9fba1b4e06061",
        "comments": [
            {
                "createdBy": "64227c2cac613fcee5f0ac31",
                "body": "Post Comment",
                "createdAt": "2023-05-07T14:26:37.031Z",
                "updatedAt": "2023-05-07T14:26:37.031Z",
                "react": [],
                "NumberOfReact": 0,
                "_id": "6457b51dbf7ddc990a0a6ebc",
                "replies": []
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| commentId | 6457b51dbf7ddc990a0a6eb |  |



***Body: None***



#### II. Example Response: Error
```js
{
    "type": "Reply",
    "status": 400,
    "message": "Bad request",
    "error": "Cast to ObjectId failed for value \"6457b51dbf7ddc990a0a6eb\" (type string) at path \"_id\" for model \"Posts\""
}
```


***Status Code:*** 400

<br>



### 7. Get Follwoing by userId



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/user/following
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64226c35f1b98662c7301067 |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64226c35f1b98662c7301067 |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "type": "Following",
    "status": 200,
    "message": "OK",
    "following": [
        {
            "_id": "642ce11e16b840aab116ec63",
            "name": "Farhan Mahtab Mahi",
            "username": "Farhan Mahtab Mahi",
            "profilePicture": "https://avatars.githubusercontent.com/u/51365144?v=4",
            "followers": [
                "64226c35f1b98662c7301067"
            ],
            "following": []
        },
        {
            "_id": "642bbcee54dcd68c01c9dccb",
            "name": "maruf pulok",
            "username": "heromaruf",
            "profilePicture": "/Resource/marufPP.jpg",
            "followers": [
                "64227c2cac613fcee5f0ac31",
                "64226c35f1b98662c7301067"
            ],
            "following": [
                "64227c2cac613fcee5f0ac31"
            ]
        },
        {
            "_id": "64268101b4407e69dc71d1f2",
            "name": "Mahi",
            "username": "Mahi Mahi",
            "profilePicture": "",
            "followers": [
                "6426792cb4407e69dc71d149",
                "64226c35f1b98662c7301067",
                "64227c2cac613fcee5f0ac31"
            ],
            "following": []
        },
        {
            "_id": "64226c35f1b98662c7301067",
            "name": "Mazhar Ali",
            "username": "mazharali22",
            "profilePicture": "/Resource/user.jpeg",
            "followers": [
                "64225946691de128e8d3a6d8",
                "6426792cb4407e69dc71d149",
                "64226c35f1b98662c7301067",
                "64227c2cac613fcee5f0ac31"
            ],
            "following": [
                "642ce11e16b840aab116ec63",
                "642bbcee54dcd68c01c9dccb",
                "64268101b4407e69dc71d1f2",
                "64226c35f1b98662c7301067"
            ]
        }
    ]
}
```


***Status Code:*** 200

<br>



### 8. Get followers by userId



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/user/follower
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64226c35f1b98662c7301067 |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64226c35f1b98662c7301067 |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "type": "Followers",
    "status": 200,
    "message": "OK",
    "followers": [
        {
            "_id": "64226c35f1b98662c7301067",
            "name": "Mazhar Ali",
            "username": "mazharali22",
            "profilePicture": "/Resource/user.jpeg",
            "followers": [
                "64225946691de128e8d3a6d8",
                "6426792cb4407e69dc71d149",
                "64226c35f1b98662c7301067",
                "64227c2cac613fcee5f0ac31"
            ]
        },
        {
            "_id": "64227c2cac613fcee5f0ac31",
            "name": "Farhan Mahtab",
            "username": "ironblood",
            "profilePicture": "/Resource/pp.jpeg",
            "followers": [
                "64225946691de128e8d3a6d8",
                "6426792cb4407e69dc71d149",
                "64227c2cac613fcee5f0ac31",
                "642bbcee54dcd68c01c9dccb",
                "64227c2cac613fcee5f0ac31",
                "64227c2cac613fcee5f0ac31",
                "64227c2cac613fcee5f0ac31",
                "64227c2cac613fcee5f0ac31",
                "64227c2cac613fcee5f0ac31"
            ]
        }
    ]
}
```


***Status Code:*** 200

<br>



### 9. follow/unfollow user by ID



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/user/64227c2cac613fcee5f0ac31
```



***Body:***

```js        
{
    "currentUserId":"64225946691de128e8d3a6d8"
}
```



***More example Requests/Responses:***


#### I. Example Request: success(follow)



***Body:***

```js        
{
    "currentUserId":"64227c2cac613fcee5f0ac31"
}
```



#### I. Example Response: success(follow)
```js
{
    "type": "FOllow",
    "status": 201,
    "message": "user followed",
    "userToFollow": {
        "_id": "64227c2cac613fcee5f0ac31",
        "name": "Farhan Mahtab",
        "username": "ironblood",
        "email": "mahi@gmail.com",
        "password": "$2b$10$vzuU1Aa46HV6xBWWscKpOuhOqO1wAVxfty/YN5F.9LzT4czRvPvuC",
        "profilePicture": "/Resource/pp.jpeg",
        "coverPhoto": "/Resource/post_image1.jpeg",
        "bio": "Patching",
        "followers": [
            "64225946691de128e8d3a6d8",
            "6426792cb4407e69dc71d149",
            "64227c2cac613fcee5f0ac31",
            "642bbcee54dcd68c01c9dccb",
            "64227c2cac613fcee5f0ac31",
            "64227c2cac613fcee5f0ac31",
            "64227c2cac613fcee5f0ac31",
            "64227c2cac613fcee5f0ac31",
            "64227c2cac613fcee5f0ac31"
        ],
        "following": [
            "642bbcee54dcd68c01c9dccb",
            "64268101b4407e69dc71d1f2",
            "64226c35f1b98662c7301067"
        ],
        "__v": 97,
        "messages": [
            {
                "sender": "64226c35f1b98662c7301067",
                "chatID": "6450daa299e83c171839b7a2",
                "cus_id": "64227c2cac613fcee5f0ac3164226c35f1b98662c7301067",
                "username": "mazharali22",
                "email": "shawon@gmail.com",
                "_id": "6450daa299e83c171839b7a5"
            },
            {
                "sender": "642bbcee54dcd68c01c9dccb",
                "chatID": "6450e4e399e83c171839bad7",
                "cus_id": "642bbcee54dcd68c01c9dccb64227c2cac613fcee5f0ac31",
                "username": "heromaruf",
                "email": "maruf@gmail.com",
                "_id": "6450e4e399e83c171839bada"
            }
        ],
        "updatedAt": "2023-05-07T14:35:02.173Z",
        "notifications": [],
        "token": "colao5kVZn9W-zDcI7GgQX:APA91bHmbE9DGsgRWjZuO6D_aaV08vcJUtqSUR8ytznWmvEWN8qi11tGqXdJ4sHkdJOdgbqXB9FK2yPCzUQk7KAMGKFIVpmDAaehOXtTT9oGUUJx2VmVxm0epAqcKCyZEeVS2Taz_oFw"
    }
}
```


***Status Code:*** 201

<br>



#### II. Example Request: success(unfollow)



***Body:***

```js        
{
    "currentUserId":"64227c2cac613fcee5f0ac31"
}
```



#### II. Example Response: success(unfollow)
```js
{
    "type": "FOllow",
    "status": 201,
    "message": "user Un-followed",
    "userToFollow": {
        "_id": "64227c2cac613fcee5f0ac31",
        "name": "Farhan Mahtab",
        "username": "ironblood",
        "email": "mahi@gmail.com",
        "password": "$2b$10$vzuU1Aa46HV6xBWWscKpOuhOqO1wAVxfty/YN5F.9LzT4czRvPvuC",
        "profilePicture": "/Resource/pp.jpeg",
        "coverPhoto": "/Resource/post_image1.jpeg",
        "bio": "Patching",
        "followers": [
            "64225946691de128e8d3a6d8",
            "6426792cb4407e69dc71d149",
            "642bbcee54dcd68c01c9dccb"
        ],
        "following": [
            "642bbcee54dcd68c01c9dccb",
            "64268101b4407e69dc71d1f2",
            "64226c35f1b98662c7301067",
            "64227c2cac613fcee5f0ac31"
        ],
        "__v": 99,
        "messages": [
            {
                "sender": "64226c35f1b98662c7301067",
                "chatID": "6450daa299e83c171839b7a2",
                "cus_id": "64227c2cac613fcee5f0ac3164226c35f1b98662c7301067",
                "username": "mazharali22",
                "email": "shawon@gmail.com",
                "_id": "6450daa299e83c171839b7a5"
            },
            {
                "sender": "642bbcee54dcd68c01c9dccb",
                "chatID": "6450e4e399e83c171839bad7",
                "cus_id": "642bbcee54dcd68c01c9dccb64227c2cac613fcee5f0ac31",
                "username": "heromaruf",
                "email": "maruf@gmail.com",
                "_id": "6450e4e399e83c171839bada"
            }
        ],
        "updatedAt": "2023-05-07T14:35:08.985Z",
        "notifications": [],
        "token": "colao5kVZn9W-zDcI7GgQX:APA91bHmbE9DGsgRWjZuO6D_aaV08vcJUtqSUR8ytznWmvEWN8qi11tGqXdJ4sHkdJOdgbqXB9FK2yPCzUQk7KAMGKFIVpmDAaehOXtTT9oGUUJx2VmVxm0epAqcKCyZEeVS2Taz_oFw"
    }
}
```


***Status Code:*** 201

<br>



#### III. Example Request: error



***Body:***

```js        
{
    "currentUserId":"64227c2cac613fcee5f0ac31"
}
```



#### III. Example Response: error
```js
{
    "type": "User",
    "status": 404,
    "message": "Error",
    "error": "Cast to ObjectId failed for value \"64227c2cac613fcee5f0ac3\" (type string) at path \"_id\" for model \"User\""
}
```


***Status Code:*** 400

<br>



### 10. Post a comment



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/post/comment
```



***Body:***

```js        
{
    "email":"mahi@gmail.com",
    "postId":"64339bbb9c917bf6515f8bc4",
    "body":"test comment 4"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "email":"mahi@gmail.com",
    "postId":"6453824308a9fba1b4e06061",
    "body":"Post Comment"
}
```



#### I. Example Response: Success
```js
{
    "success": true,
    "type": "Comment",
    "status": 201,
    "message": "OK",
    "comment": {
        "createdBy": "64227c2cac613fcee5f0ac31",
        "body": "Post Comment",
        "createdAt": "2023-05-07T14:26:37.031Z",
        "updatedAt": "2023-05-07T14:26:37.031Z"
    }
}
```


***Status Code:*** 201

<br>



#### II. Example Request: Error



***Body:***

```js        
{
    "email":"mahi@gmail.com",
    "postId":"6453824308a9fba1b4e0606",
    "body":"Post Comment"
}
```



#### II. Example Response: Error
```js
{
    "success": false,
    "type": "Comment",
    "status": 400,
    "message": "Bad Request",
    "error": "Cast to ObjectId failed for value \"6453824308a9fba1b4e0606\" (type string) at path \"_id\" for model \"Posts\""
}
```


***Status Code:*** 400

<br>



### 11. Get comments



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/post/comments
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 6433d1de9c917bf6515f9ac3 |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 6453824308a9fba1b4e06061 |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "success": true,
    "type": "Comment",
    "status": 200,
    "message": "OK",
    "comments": [
        {
            "createdBy": {
                "_id": "64226c35f1b98662c7301067",
                "name": "Mazhar Ali",
                "username": "mazharali22",
                "email": "shawon@gmail.com",
                "profilePicture": "/Resource/user.jpeg"
            },
            "body": "toast",
            "createdAt": "2023-05-04T18:01:07.080Z",
            "updatedAt": "2023-05-04T18:01:07.080Z",
            "react": [],
            "NumberOfReact": 0,
            "_id": "6453f2e38b9ac3c6ba483d85",
            "replies": []
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 6433d1de9c917bf6515f9ac3 |  |



***Body: None***



#### II. Example Response: Error
```js
{
    "success": false,
    "type": "Comment",
    "status": 404,
    "message": "Post not found"
}
```


***Status Code:*** 404

<br>



### 12. Like/unlike a post



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/post/react
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 642d0758aa0ca5c0e13e35e3 |  |



***Body:***

```js        
{
    "userId":"64227c2cac613fcee5f0ac31"
}
```



***More example Requests/Responses:***


#### I. Example Request: Like a post



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 642d0758aa0ca5c0e13e35e3 |  |



***Body:***

```js        
{
    "userId":"64227c2cac613fcee5f0ac31"
}
```



#### I. Example Response: Like a post
```js
{
    "success": true,
    "type": "Reacts",
    "status": 201,
    "message": "Liked"
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Unlike a post



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 642d0758aa0ca5c0e13e35e3 |  |



***Body:***

```js        
{
    "userId":"64227c2cac613fcee5f0ac31"
}
```



#### II. Example Response: Unlike a post
```js
{
    "success": true,
    "type": "Reacts",
    "status": 201,
    "message": "Unliked"
}
```


***Status Code:*** 200

<br>



### 13. Delete a post



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: http://localhost:3000/api/post/posts
```



***Body:***

```js        
{
    "postId":"642d04f8aa0ca5c0e13e3595"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "postId":"645383f108a9fba1b4e06162"
}
```



#### I. Example Response: Success
```js
{
    "type": "Posts",
    "status": 200,
    "message": "Deleted"
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Body:***

```js        
{
    "postId":"645383f108a9fba1b4e061621"
}
```



#### II. Example Response: Error
```js
{
    "type": "Error",
    "status": 400,
    "message": "Bad request",
    "error": "Cast to ObjectId failed for value \"645383f108a9fba1b4e061621\" (type string) at path \"_id\" for model \"Posts\""
}
```


***Status Code:*** 400

<br>



### 14. Patch Post



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: http://localhost:3000/api/post/posts
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 643381179c917bf6515f8777 |  |



***Body:***

```js        
{
    "body":"post Toast",
    "PostImage":"/Resource/post_image5.jpeg"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 6453824308a9fba1b4e06061 |  |



***Body:***

```js        
{
  "body":"post Toast",
    "PostImage":"32fabd2427b7cc0f913450600.jpeg"
}
```



#### I. Example Response: Success
```js
{
    "type": "Posts",
    "status": 200,
    "message": "Updated",
    "post": {
        "_id": "6453824308a9fba1b4e06061",
        "createdBy": {
            "_id": "6453780408a9fba1b4e05e8a",
            "name": "Test user 1",
            "username": "test1",
            "email": "test1@gmail.com",
            "profilePicture": "https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        "body": "post Toast",
        "PostImage": null,
        "react": [],
        "NumberOfReact": 0,
        "NumberOfRetweet": 0,
        "createdAt": "2023-05-04T10:00:35.814Z",
        "updatedAt": "2023-05-04T10:06:48.623Z",
        "comments": [],
        "retweets": [],
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| postId | 6453824308a9fba1b4e06061s |  |



***Body:***

```js        
{
    "body":"post Toast",
    "PostImage":"/Resource/post_image5.jpeg"
}
```



#### II. Example Response: Error
```js
{
    "type": "Error",
    "status": 400,
    "message": "Bad request",
    "error": "Cast to ObjectId failed for value \"6453824308a9fba1b4e06061s\" (type string) at path \"_id\" for model \"Posts\""
}
```


***Status Code:*** 400

<br>



### 15. Post a tweet



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/post
```



***Body:***

```js        
{
    "email": "mahi@gmail.com",
    "body": "Post Image New",
    "postImage":"/Resource/post_image3.jpeg"
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "email": "test1@gmail.com",
    "body": "Post Image New",
    "postImage":"https://images.pexels.com/photos/920220/pexels-photo-920220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
```



#### I. Example Response: Success
```js
{
    "status": true,
    "data": {
        "createdBy": "6453780408a9fba1b4e05e8a",
        "body": "Post Image New",
        "PostImage": null,
        "react": [],
        "NumberOfReact": 0,
        "NumberOfRetweet": 0,
        "_id": "6453824308a9fba1b4e06061",
        "createdAt": "2023-05-04T10:00:35.814Z",
        "updatedAt": "2023-05-04T10:00:35.814Z",
        "comments": [],
        "retweets": [],
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



### 16. Get posts by user Id



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: http://localhost:3000/api/post/userPost
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64227c2cac613fcee5f0ac31 |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64227c2cac613fcee5f0ac31 |  |



#### I. Example Response: Success
```js
{
    "type": "Posts",
    "status": 200,
    "message": "OK",
    "posts": [
        {
            "NumberOfRetweet": 0,
            "_id": "642d01c6aa0ca5c0e13e3533",
            "createdBy": {
                "_id": "64227c2cac613fcee5f0ac31",
                "name": "Farhan Mahtab",
                "username": "ironblood",
                "profilePicture": "/Resource/pp.jpeg"
            },
            "body": "test",
            "PostImage": "32fabd2427b7cc0f913450600.jpeg",
            "react": [
                "64226c35f1b98662c7301067"
            ],
            "NumberOfReact": 0,
            "Comment": [],
            "NumberOfComment": 0,
            "createdAt": "2023-04-05T05:06:14.504Z",
            "updatedAt": "2023-04-05T07:59:29.764Z",
            "__v": 1,
            "comments": [],
            "retweets": []
        },
        {
            "NumberOfRetweet": 0,
            "_id": "642d02d0aa0ca5c0e13e356d",
            "createdBy": {
                "_id": "64227c2cac613fcee5f0ac31",
                "name": "Farhan Mahtab",
                "username": "ironblood",
                "profilePicture": "/Resource/pp.jpeg"
            },
            "body": "Post",
            "PostImage": null,
            "react": [],
            "NumberOfReact": 0,
            "Comment": [],
            "NumberOfComment": 0,
            "createdAt": "2023-04-05T05:10:40.798Z",
            "updatedAt": "2023-04-05T05:10:40.798Z",
            "__v": 0,
            "comments": [],
            "retweets": []
        },
        {
            "NumberOfRetweet": 0,
            "_id": "642d02efaa0ca5c0e13e3577",
            "createdBy": {
                "_id": "64227c2cac613fcee5f0ac31",
                "name": "Farhan Mahtab",
                "username": "ironblood",
                "profilePicture": "/Resource/pp.jpeg"
            },
            "body": "knee guard",
            "PostImage": "32fabd2427b7cc0f913450601.jpeg",
            "react": [],
            "NumberOfReact": 0,
            "Comment": [
                "642d2cacaa0ca5c0e13f3f2d"
            ],
            "NumberOfComment": 0,
            "createdAt": "2023-04-05T05:11:11.595Z",
            "updatedAt": "2023-04-06T03:20:15.963Z",
            "__v": 9,
            "comments": [],
            "retweets": []
        },
        {
            "NumberOfRetweet": 0,
            "_id": "6432a7153b177333172a2882",
            "createdBy": {
                "_id": "64227c2cac613fcee5f0ac31",
                "name": "Farhan Mahtab",
                "username": "ironblood",
                "profilePicture": "/Resource/pp.jpeg"
            },
            "body": "image post",
            "PostImage": "93dc0a01d42dce1865daffc01.jpg",
            "react": [
                "642bbcee54dcd68c01c9dccb"
            ],
            "NumberOfReact": 0,
            "retweets": [],
            "createdAt": "2023-04-09T11:52:53.555Z",
            "updatedAt": "2023-04-11T07:44:58.030Z",
            "comments": [
                {
                    "createdBy": "64227c2cac613fcee5f0ac31",
                    "body": "nice image",
                    "createdAt": "2023-04-11T07:03:13.573Z",
                    "updatedAt": "2023-04-11T07:03:13.573Z",
                    "react": [],
                    "NumberOfReact": 0,
                    "_id": "64350631d8d959a0bcdf0a96",
                    "replies": []
                },
                {
                    "createdBy": "64227c2cac613fcee5f0ac31",
                    "body": "comment",
                    "createdAt": "2023-04-11T07:04:14.328Z",
                    "updatedAt": "2023-04-11T07:04:14.328Z",
                    "react": [],
                    "NumberOfReact": 0,
                    "_id": "6435066ed8d959a0bcdf0af5",
                    "replies": [
                        {
                            "createdBy": "64227c2cac613fcee5f0ac31",
                            "body": "reply",
                            "createdAt": "2023-04-11T07:06:10.139Z",
                            "updatedAt": "2023-04-11T07:06:10.139Z",
                            "_id": "643506e2d8d959a0bcdf0b6b"
                        }
                    ]
                },
                {
                    "createdBy": "64227c2cac613fcee5f0ac31",
                    "body": "comment 2",
                    "createdAt": "2023-04-11T07:06:36.965Z",
                    "updatedAt": "2023-04-11T07:06:36.965Z",
                    "react": [],
                    "NumberOfReact": 0,
                    "_id": "643506fcd8d959a0bcdf0be9",
                    "replies": [
                        {
                            "createdBy": "642bbcee54dcd68c01c9dccb",
                            "body": "reply 2",
                            "createdAt": "2023-04-11T07:44:58.028Z",
                            "updatedAt": "2023-04-11T07:44:58.028Z",
                            "_id": "64350ffad8d959a0bcdf1e23"
                        }
                    ]
                }
            ],
            "__v": 12
        },
        {
            "_id": "6432dadc3b177333172a2914",
            "createdBy": {
                "_id": "64227c2cac613fcee5f0ac31",
                "name": "Farhan Mahtab",
                "username": "ironblood",
                "profilePicture": "/Resource/pp.jpeg"
            },
            "body": "Updated post",
            "PostImage": "93dc0a01d42dce1865daffc02.jpg",
            "react": [
                "642bbcee54dcd68c01c9dccb"
            ],
            "NumberOfReact": 0,
            "retweets": [
                {
                    "typeofTweet": "retweet",
                    "post": "643664338aef418b9775fdc8",
                    "createdBy": "642bbcee54dcd68c01c9dccb",
                    "_id": "643664338aef418b9775fdca"
                },
                {
                    "typeofTweet": "retweet",
                    "post": "643667fb8aef418b977603d7",
                    "createdBy": "64226c35f1b98662c7301067",
                    "_id": "643667fc8aef418b977603d9"
                }
            ],
            "createdAt": "2023-04-09T15:33:48.371Z",
            "updatedAt": "2023-04-12T08:12:44.019Z",
            "comments": [
                {
                    "createdBy": "642bbcee54dcd68c01c9dccb",
                    "body": "tomioka Giyu",
                    "createdAt": "2023-04-10T08:06:41.476Z",
                    "updatedAt": "2023-04-10T08:06:41.476Z",
                    "react": [],
                    "NumberOfReact": 0,
                    "_id": "6433c3919c917bf6515f969c",
                    "replies": []
                }
            ],
            "__v": 14,
            "NumberOfRetweet": 2
        },
        {
            "_id": "643642288aef418b9775e9e9",
            "createdBy": {
                "_id": "64227c2cac613fcee5f0ac31",
                "name": "Farhan Mahtab",
                "username": "ironblood",
                "profilePicture": "/Resource/pp.jpeg"
            },
            "body": "test retweet 1",
            "react": [],
            "NumberOfReact": 0,
            "typeofTweet": "retweet",
            "originalTweetId": "6436420b8aef418b9775e9d5",
            "NumberOfRetweet": 0,
            "createdAt": "2023-04-12T05:31:20.424Z",
            "updatedAt": "2023-04-12T05:31:20.424Z",
            "comments": [],
            "retweets": [],
            "__v": 0
        },
        {
            "_id": "6450a0d199e83c171839ae6c",
            "createdBy": {
                "_id": "64227c2cac613fcee5f0ac31",
                "name": "Farhan Mahtab",
                "username": "ironblood",
                "profilePicture": "/Resource/pp.jpeg"
            },
            "body": "test ",
            "PostImage": null,
            "react": [],
            "NumberOfReact": 0,
            "typeofTweet": "original",
            "NumberOfRetweet": 0,
            "createdAt": "2023-05-02T05:34:09.500Z",
            "updatedAt": "2023-05-02T05:34:14.579Z",
            "comments": [],
            "retweets": [],
            "__v": 2
        }
    ]
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 64227c2cac613fcee5f0ac3 |  |



#### II. Example Response: Error
```js
{
    "type": "Error",
    "status": 400,
    "message": "Not Found",
    "error": "Cast to ObjectId failed for value \"64227c2cac613fcee5f0ac3\" (type string) at path \"_id\" for model \"User\""
}
```


***Status Code:*** 400

<br>



### 17. Get post by id



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/post/6436420b8aef418b9775e9d5
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "type": "Posts",
    "status": 200,
    "message": "OK",
    "post": {
        "_id": "6436420b8aef418b9775e9d5",
        "createdBy": {
            "_id": "642bbcee54dcd68c01c9dccb",
            "name": "maruf pulok",
            "username": "heromaruf",
            "email": "maruf@gmail.com",
            "profilePicture": "/Resource/marufPP.jpg"
        },
        "body": "original post",
        "PostImage": null,
        "react": [],
        "NumberOfReact": 0,
        "typeofTweet": "original",
        "NumberOfRetweet": 3,
        "createdAt": "2023-04-12T05:30:51.703Z",
        "updatedAt": "2023-04-12T08:05:39.888Z",
        "comments": [],
        "retweets": [
            {
                "typeofTweet": "retweet",
                "post": "643642288aef418b9775e9e9",
                "createdBy": "64227c2cac613fcee5f0ac31",
                "_id": "643642288aef418b9775e9eb"
            },
            {
                "typeofTweet": "retweet",
                "post": "643649918aef418b9775ed04",
                "createdBy": "642bbcee54dcd68c01c9dccb",
                "_id": "643649918aef418b9775ed06"
            },
            {
                "typeofTweet": "retweet",
                "post": "643666538aef418b9775ff95",
                "createdBy": "642bbcee54dcd68c01c9dccb",
                "_id": "643666538aef418b9775ff97"
            }
        ],
        "__v": 3
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Body: None***



#### II. Example Response: Error
```js
{
    "type": "Posts",
    "status": 404,
    "message": "Not Found",
    "error": "Cast to ObjectId failed for value \"6436420b8aef418b9775e9d\" (type string) at path \"_id\" for model \"Posts\""
}
```


***Status Code:*** 400

<br>



### 18. Get all post



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/post/posts
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| page | 1 |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| page | 1 |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "type": "Posts",
    "status": 200,
    "message": "OK",
    "posts": [
        {
            "_id": "643667fb8aef418b977603d7",
            "createdBy": {
                "_id": "64226c35f1b98662c7301067",
                "name": "Mazhar Ali",
                "username": "mazharali22",
                "email": "shawon@gmail.com",
                "profilePicture": "/Resource/user.jpeg"
            },
            "body": "nice :3",
            "react": [],
            "NumberOfReact": 0,
            "typeofTweet": "retweet",
            "originalTweetId": "6432dadc3b177333172a2914",
            "NumberOfRetweet": 0,
            "createdAt": "2023-04-12T08:12:43.934Z",
            "updatedAt": "2023-04-12T08:13:05.035Z",
            "comments": [],
            "retweets": [],
            "__v": 2
        },
        {
            "_id": "643666698aef418b97760021",
            "createdBy": {
                "_id": "642bbcee54dcd68c01c9dccb",
                "name": "maruf pulok",
                "username": "heromaruf",
                "email": "maruf@gmail.com",
                "profilePicture": "/Resource/marufPP.jpg"
            },
            "body": "re re tweet tweet",
            "react": [],
            "NumberOfReact": 0,
            "typeofTweet": "retweet",
            "originalTweetId": "643666538aef418b9775ff95",
            "NumberOfRetweet": 0,
            "createdAt": "2023-04-12T08:06:01.235Z",
            "updatedAt": "2023-04-12T08:06:01.235Z",
            "comments": [],
            "retweets": [],
            "__v": 0
        },
        {
            "_id": "643666538aef418b9775ff95",
            "createdBy": {
                "_id": "642bbcee54dcd68c01c9dccb",
                "name": "maruf pulok",
                "username": "heromaruf",
                "email": "maruf@gmail.com",
                "profilePicture": "/Resource/marufPP.jpg"
            },
            "body": "retweet test",
            "react": [],
            "NumberOfReact": 0,
            "typeofTweet": "retweet",
            "originalTweetId": "6436420b8aef418b9775e9d5",
            "NumberOfRetweet": 1,
            "createdAt": "2023-04-12T08:05:39.784Z",
            "updatedAt": "2023-04-12T08:06:01.313Z",
            "comments": [],
            "retweets": [
                {
                    "typeofTweet": "retweet",
                    "post": "643666698aef418b97760021",
                    "createdBy": "642bbcee54dcd68c01c9dccb",
                    "_id": "643666698aef418b97760023"
                }
            ],
            "__v": 1
        },
        {
            "_id": "643664338aef418b9775fdc8",
            "createdBy": {
                "_id": "642bbcee54dcd68c01c9dccb",
                "name": "maruf pulok",
                "username": "heromaruf",
                "email": "maruf@gmail.com",
                "profilePicture": "/Resource/marufPP.jpg"
            },
            "body": "wryy tweet",
            "react": [],
            "NumberOfReact": 0,
            "typeofTweet": "retweet",
            "originalTweetId": "6432dadc3b177333172a2914",
            "NumberOfRetweet": 0,
            "createdAt": "2023-04-12T07:56:35.752Z",
            "updatedAt": "2023-04-12T07:56:35.752Z",
            "comments": [],
            "retweets": [],
            "__v": 0
        },
        {
            "_id": "643642288aef418b9775e9e9",
            "createdBy": {
                "_id": "64227c2cac613fcee5f0ac31",
                "name": "Farhan Mahtab",
                "username": "ironblood",
                "email": "mahi@gmail.com",
                "profilePicture": "/Resource/pp.jpeg"
            },
            "body": "test retweet 1",
            "react": [],
            "NumberOfReact": 0,
            "typeofTweet": "retweet",
            "originalTweetId": "6436420b8aef418b9775e9d5",
            "NumberOfRetweet": 0,
            "createdAt": "2023-04-12T05:31:20.424Z",
            "updatedAt": "2023-04-12T05:31:20.424Z",
            "comments": [],
            "retweets": [],
            "__v": 0
        }
    ],
    "nextpage": 5
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| page | -1 |  |



***Body: None***



#### II. Example Response: Error
```js
{
    "type": "Posts",
    "status": 400,
    "message": "Bad request",
    "error": "BSON field 'skip' value must be >= 0, actual value '-1'"
}
```


***Status Code:*** 400

<br>



### 19. patch user by id



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: http://localhost:3000/api/user/64522bdf6d81e61829794c84
```



***Body:***

```js        
{
    "bio":"Patching going on"
 
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
    "bio":"never settle"
 
}
```



#### I. Example Response: Success
```js
{
    "type": "User",
    "status": 200,
    "message": "Updated",
    "user": {
        "_id": "645372aa08a9fba1b4e05b1b",
        "name": "Test user 2",
        "username": "test2",
        "email": "test2@gmail.com",
        "password": "$2b$10$ZzgdsNkiR7eU0lyvQvwDNuMp6gH8n0mCe9N58rSPZR14GjJlzOpGi",
        "profilePicture": "https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "coverPhoto": "https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "bio": "never settle",
        "followers": [],
        "following": [],
        "notifications": [],
        "messages": [],
        "createdAt": "2023-05-04T08:54:02.801Z",
        "updatedAt": "2023-05-04T09:22:18.507Z",
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Body:***

```js        
{
    "bio":"never settle"
 
}
```



#### II. Example Response: Error
```js
{
    "type": "User",
    "status": 404,
    "message": "User Not Found",
    "error": "Cast to ObjectId failed for value \"645372aa08a9fba1b4e05b1\" (type string) at path \"_id\" for model \"User\""
}
```


***Status Code:*** 400

<br>



### 20. Post  a User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/user
```



***Body:***

```js        
{
     "name": "Test user",
    "username": "test1",
    "email": "test1@gmail.com",
    "password": "1234",
    "profilePicture": "/Resource/anindo.jpg",
    "coverPhoto": "/Resource/img6.jpeg",
    "bio": "never stop",
    "followers": [],
    "following": []
}
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body:***

```js        
{
     "name": "Test user 1",
    "username": "test1",
    "email": "test1@gmail.com",
    "password": "1234",
    "profilePicture": "https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "coverPhoto": "https://images.pexels.com/photos/7310213/pexels-photo-7310213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "bio": "never stop",
    "followers": [],
    "following": []
}
```



#### I. Example Response: Success
```js
{
    "type": "User",
    "status": true,
    "message": "OK",
    "data": {
        "name": "Test user 1",
        "username": "test1",
        "email": "test1@gmail.com",
        "password": "$2b$10$wI9J1uKtVKw7bCEce5cqce3T.E.uRYf8uGpWJcbxXN9QX5zYM.Th6",
        "profilePicture": "https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "coverPhoto": "https://images.pexels.com/photos/7310213/pexels-photo-7310213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "bio": "never stop",
        "followers": [],
        "following": [],
        "_id": "6453780408a9fba1b4e05e8a",
        "notifications": [],
        "messages": [],
        "createdAt": "2023-05-04T09:16:52.264Z",
        "updatedAt": "2023-05-04T09:16:52.264Z",
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Body:***

```js        
{
     "name": "Test user 1",
    "username": "test1",
    "email": "test1@gmail.com",
    "password": "1234",
    "profilePicture": "https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "coverPhoto": "https://images.pexels.com/photos/7310213/pexels-photo-7310213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "bio": "never stop",
    "followers": [],
    "following": []
}
```



#### II. Example Response: Error
```js
{
    "type": "Error",
    "status": false,
    "message": "Not found",
    "error": "User validation failed: email: Path `email` is required."
}
```


***Status Code:*** 400

<br>



### 21. Get User by Id



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/user/64226c35f1b98662c7301067
```



***More example Requests/Responses:***


#### I. Example Request: Success



***Body: None***



#### I. Example Response: Success
```js
{
    "type": "User",
    "status": 200,
    "message": "OK",
    "user": {
        "_id": "642ce11e16b840aab116ec63",
        "name": "Farhan Mahtab Mahi",
        "username": "Farhan Mahtab Mahi",
        "email": "farhan.mahi1999@gmail.com",
        "profilePicture": "https://avatars.githubusercontent.com/u/51365144?v=4",
        "coverPhoto": "https://avatars.githubusercontent.com/u/51365144?v=4",
        "bio": "",
        "followers": [
            {
                "_id": "64226c35f1b98662c7301067",
                "name": "Mazhar Ali",
                "username": "mazharali22",
                "email": "shawon@gmail.com",
                "profilePicture": "/Resource/user.jpeg"
            }
        ],
        "following": [],
        "__v": 1,
        "notifications": [],
        "messages": []
    }
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Error



***Body: None***



#### II. Example Response: Error
```js
{
    "type": "Error",
    "status": 404,
    "message": "Not found",
    "error": "Cast to ObjectId failed for value \"642ce11e16b840aab116ec6\" (type string) at path \"_id\" for model \"User\""
}
```


***Status Code:*** 400

<br>



### 22. Get all user



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/user
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6426792cb4407e69dc71d149 |  |



***More example Requests/Responses:***


#### I. Example Request: Success



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6426792cb4407e69dc71d149 |  |



***Body: None***



#### I. Example Response: Success
```js
{
    "type": "result",
    "status": 200,
    "message": "OK",
    "users": [
        {
            "_id": "64226c35f1b98662c7301067",
            "name": "Mazhar Ali",
            "username": "mazharali22",
            "email": "shawon@gmail.com",
            "password": "$2b$10$7PghdTch.SdGZE3Yvy9.8OGShFTsWHLpHSEGw1ZAsj8qdKGKsnEG2",
            "profilePicture": "/Resource/user.jpeg",
            "coverPhoto": "/Resource/img4.jpeg",
            "bio": "GS Shawon",
            "followers": [
                "64225946691de128e8d3a6d8",
                "6426792cb4407e69dc71d149",
                "64226c35f1b98662c7301067",
                "64227c2cac613fcee5f0ac31"
            ],
            "following": [
                "642ce11e16b840aab116ec63",
                "642bbcee54dcd68c01c9dccb",
                "64268101b4407e69dc71d1f2",
                "64226c35f1b98662c7301067"
            ],
            "__v": 104,
            "notifications": [],
            "updatedAt": "2023-05-04T06:28:03.065Z",
            "messages": [
                {
                    "sender": "64227c2cac613fcee5f0ac31",
                    "chatID": "6450daa299e83c171839b7a2",
                    "cus_id": "64227c2cac613fcee5f0ac3164226c35f1b98662c7301067",
                    "username": "ironblood",
                    "email": "mahi@gmail.com",
                    "_id": "6450daa299e83c171839b7a7"
                },
                {
                    "sender": "64226c35f1b98662c7301067",
                    "chatID": "6451fed26d81e61829793aba",
                    "cus_id": "64226c35f1b98662c730106764226c35f1b98662c7301067",
                    "username": "mazharali22",
                    "email": "shawon@gmail.com",
                    "_id": "6451fed26d81e61829793abf"
                },
                {
                    "sender": "642bbcee54dcd68c01c9dccb",
                    "chatID": "645204d86d81e61829794499",
                    "cus_id": "642bbcee54dcd68c01c9dccb64226c35f1b98662c7301067",
                    "username": "heromaruf",
                    "email": "maruf@gmail.com",
                    "_id": "645204d96d81e6182979449e"
                }
            ],
            "token": "dEFxgir6zsuifi25XSvD4s:APA91bG6WxBKzIfbAEIyfd--XOKOKTFAdXGK-9x5YwTcAZdN8tWFeFb0uaU6XoAohD8o2tUA3iDwJpR8_n_ufR5P6DGBxL92OQPxiYDYxwh6w0lg-xxYXroVzqjh5WL2zanhin_rcp9w",
            "isFollowed": true
        }
    ]
}
```


***Status Code:*** 200

<br>



---
[Back to top](#twitter-clone)

>Generated at 2023-05-11 10:37:14 by [docgen](https://github.com/thedevsaddam/docgen)
