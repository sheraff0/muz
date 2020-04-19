export const dataItem = (data, id) =>
  [data]?.flat().filter(item => item.id === id)?.[0]

export const data2Submit = values => Object.fromEntries(
  Object.entries(values).map(entry => ([
    entry[0], 
    entry[1]?._isAMomentObject
      ? entry[1].format(entry[1]._f === "HH:mm" ? "HH:mm" : "YYYY-MM-DD")
      : entry[1]
  ]))
)