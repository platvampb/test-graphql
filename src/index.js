const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const qs = require('querystring')

const getObjectData = (entity, options) => {
  let url = `http://torwlchale01/devlogin/mddevform/api/v2/object/${entity}`
  if (options) {
    url += '?' + qs.stringify(options)
  }

  return fetch(url, {
    headers: {
      Authorization: 'Basic TWljaGFlbC5EYWhsa2VAaW50ZWxleC5jb206MQ==',
    },
  })
}

let tabs = [
  {
    id: '2',
    caption: 'My Tasks',
    index: 1,
  },
  {
    id: '3',
    caption: "My Staff's Tasks",
    index: 2,
  },
]

let views = [
  {
    id: '4',
    source: '...',
  },
]

let myTasksModule = {
  id: '1',
  urlCaption: 'MyTasks',
  caption: 'My Tasks',
  tabs: tabs,
  view: views[0],
}

const resolvers = {
  Query: {
    Application: (a, { urlCaption }) => {
      console.log(a)
      return getObjectData('SysModuleEntity', {
        $filter: `UrlCaption eq '${urlCaption}'`,
      })
        .then(res => res.json())
        .then(json => json.value[0])
        .then(rec => {
          return {
            id: rec.Id,
            caption: rec.Caption,
            urlCaption: rec.UrlCaption,
            tabs: [],
            view: views[0],
          }
        })
    },
  },
  Tab: () => undefined,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
