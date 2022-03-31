CREATE DATABASE parhoulums;

-- Users
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    fullname TEXT NOT NULL,
    password TEXT NOT NULL,
    question_field INT NOT NULL,
    answer TEXT NOT NULL  
);

-- Groups
CREATE TABLE groups(
    group_id SERIAL PRIMARY KEY,
    group_name TEXT NOT NULL
);

CREATE TABLE group_membership(
    group_id INT NOT NULL REFERENCES groups(group_id),
    user_id INT NOT NULL REFERENCES users(user_id),
    status INT NOT NULL,
    PRIMARY KEY(group_id,user_id)

);

-- Task List
CREATE TABLE task_list(
    task_id SERIAL PRIMARY KEY, 
    group_id INT NOT NULL REFERENCES groups(group_id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category INT NOT NULL,
    deadline DATE NOT NULL,
    assign_to INT NOT NULL REFERENCES users(user_id)
);

-- Flashcards
CREATE TABLE flashcards(
    card_id SERIAL PRIMARY KEY, 
    group_id INT NOT NULL REFERENCES groups(group_id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    rating INT NOT NULL
);

-- Topics
CREATE TABLE topic(
    topic_id SERIAL PRIMARY KEY, 
    group_id INT NOT NULL REFERENCES groups(group_id),
    title TEXT NOT NULL,
);

-- Files
CREATE TABLE files(
    file_id SERIAL PRIMARY KEY, 
    topic_id INT NOT NULL REFERENCES topics(topic_id),
    file TEXT NOT NULL -- to review
);

-- Links
CREATE TABLE links(
    link_id SERIAL PRIMARY KEY, 
    topic_id INT NOT NULL REFERENCES topics(topic_id),
    link TEXT NOT NULL -- to review
);

