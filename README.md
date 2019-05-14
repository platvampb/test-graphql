# Query example
## Single query to get all data
```query {
  Application(urlCaption: "MyTask", locale: "en") {
    id,
    caption,
    urlCaption,
    tabs {
      id,
      caption,
      index,
      view {
        id,
        content,
        data {
          rows
        }
      },  
    },
  }
}```

This query will experience a intentional 3 seconds delay

## Separate sequential queries
```
query {
  Application(urlCaption: "MyTask", locale: "en") {
    id,
    caption,
    urlCaption,
    tabs {
      id,
      caption,
      index,
      view {
        id,
        content,
      },  
    },
  },
}
```
followed by
```
query {
  Data( id: "6" ) {
    rows
  }
}
```

The first query will see no delay and the second the 3 seconds delay.