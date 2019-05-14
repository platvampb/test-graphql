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

const tabs = [
  {
    id: '2',
    caption: 'My Tasks',
    index: 1,
    viewId: '4',
  },
  {
    id: '3',
    caption: "My Staff's Tasks",
    index: 2,
    viewId: '5',
  },
]

const views = [
  {
    id: '4',
    content: 'test',
    dataId: '6',
  },
  {
    id: '5',
    content: 'test2',
    dataId: '7',
  },
]

const myTasksModule = {
  id: '1',
  urlCaption: 'MyTasks',
  caption: 'My Tasks',
  tabs: tabs,
}

const data = [
  {
    id: '6',
    rows: ['location1', 'description1', 'type1', 'stage1', 'due date1', 'status1'],
  },
  {
    id: '7',
    rows: ['location2', 'description2', 'type2', 'stage2', 'due date2', 'status2'],
  }
]

const getData = (id) => new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(data.find((d) => d.id === id))
  }, 3000)
});
/*
const getData = () => {
  console.log('test4')
  return data;
}*/

const resolvers = {
  Query: {
    Application: (a, { urlCaption }) => {
      return myTasksModule
    },
    Data: (a, { id }) => {
      return getData(id)
    },
  },
  Module: {
    tabs: () => tabs,
  },
  Tab: {
    view: t => views.find((v) => v.id === t.viewId)
  },
  View: {
    data: v => getData(v.dataId)
  },
  ObjectData: {
    rows: d => d.rows
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
