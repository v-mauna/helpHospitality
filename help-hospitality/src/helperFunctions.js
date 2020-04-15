export const replaceSpaces = str => (
    str.replace(/ /g, "-")
  )
  export const replaceHyphens = str => (
    str.replace(/-/g, " ")
  )
  export const greeting = () => {
    let today = new Date()
    let time = today.getHours()
    if(time > 5 && time < 12){
        return `Good morning.`
    }else if(time >=12 && time < 18){
        return 'Good afternoon.'
    }
    return 'Good evening.'
    }