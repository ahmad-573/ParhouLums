CREATE DATABASE parhoulums;

-- Users
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
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
    group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status INT NOT NULL,
    PRIMARY KEY(group_id,user_id)

);

-- Task List
CREATE TABLE task_list(
    task_id SERIAL PRIMARY KEY, 
    group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category INT NOT NULL,
    deadline DATE,
    assign_to INT DEFAULT NULL REFERENCES users(user_id) ON DELETE SET DEFAULT
);

-- Flashcards
CREATE TABLE flashcards(
    card_id SERIAL PRIMARY KEY, 
    group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    rating INT NOT NULL
);

-- Topics
CREATE TABLE topic(
    topic_id SERIAL PRIMARY KEY, 
    group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    title TEXT NOT NULL
);

-- Files
CREATE TABLE files(
    file_id SERIAL PRIMARY KEY, 
    topic_id INT NOT NULL REFERENCES topic(topic_id) ON DELETE CASCADE,
    file TEXT NOT NULL -- to review
);

-- Links
CREATE TABLE links(
    link_id SERIAL PRIMARY KEY, 
    topic_id INT NOT NULL REFERENCES topic(topic_id) ON DELETE CASCADE,
    link TEXT NOT NULL -- to review
);

