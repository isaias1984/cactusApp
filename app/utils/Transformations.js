export function transformDate(currentDate) {
    let date = currentDate.getDate();
    let month = currentDate.getMonth(); //Be careful! January is 0 not 1
    let year = currentDate.getFullYear();

    const dateString = year + "-" +(month + 1) + "-" + date;
    
    return dateString
  }

