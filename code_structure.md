# api to be used:

1. URL: https://www.goodreads.com/search/index.xml (sample url)
   HTTP method: GET
   Parameters:
   q: The query text to match against book title, author, and ISBN fields. Supports boolean operators and phrase searching.
   page: Which page to return (default 1, optional)
   key: Developer key (required).
   search[field]: Field to search, one of 'title', 'author', or 'all' (default is 'all')

# Find Your Book

applications features
(mainly a book suggestion platform)

1. allows to take user interest based on author name,title everytime they want to search for new book.

2. shows all books if = author name is give
   else = shows the particular book if (author name and title) are given.;

3. allows user to give feedback (ratings and comments).
   On the basis of ratings = shows the list in reverse sorted order.

4. allows users to create wishlist of books for later reference.

### later add on feature

1. chat room for users to take suggestions for new books or informal discussion.

2. login/signup for multi users

## data format

# for storing fedback data

```json

{
    "user_id":[integer]
    "Author_name": [string],
    "title": [string],
    "data":[
        {
            "rating":[integer],
            "comment":[alphanumeric],using regular expression
        },
    ],
    "message":"success";
}
```

# for storing wishlist data

```json

{
    "user_id":[integer]
    // "user_email":[using regular expression],
    // "user_name":[string],
    "data":[
        {
            "Book_name":[alpha numeric],
            "Author_name":[string],
            "rating":[integer]
        },
    ],
    "message": "success";
}
```

# data structures

> > # PROJECT
> >
> > > ## Project-Info
> > >
> > > > author_name
> > > > book_title
> > > > ratings
> > > > feedback page
> > > > wishlist
> > >
> > > ## Users [object]
> > >
> > > > username
> > > > email id
> > > > password
> > > > user id
> > >
> > > ## Feedback
> > >
> > > > user_id
> > > > author_name
> > > > title
> > > > comment[array]
> > >
> > > ## Wishlist
> > >
> > > > user_id
> > > > book_name[array]
> > > > author_name[array]
> > > > rating[array]
