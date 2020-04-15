// `type` definitions:
//    'sub' for SubMenu
//     'gr'  for Menu.ItemGroup
//    default for Menu.Item
export default () => [
  {type: "sub", key: "sub1", title: "Ученики", items: [
    {key: "1", title: "Ученики", link: "pupil"},
    {key: "2", title: "Уроки и мероприятия", link: "event"},
  ]},
  {type: "sub", key: "sub2", title: "Библиотека", items: [
    {key: "3", title: "Композиторы", link: ""},
    {key: "4", title: "Исполнители", link: ""},
  ]},
]
