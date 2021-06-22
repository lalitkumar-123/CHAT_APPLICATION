const users = []

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existinguser = users.find((user) => {
        return user.name === name && user.room === room
    });

    if(existinguser)
    {
        return {error: "Username has taken"};
    }
    
    const user = {id,name,room};

    users.push(user);
    return {user};
}

const removeuser = (id) => {
    var el = -1;
    for(const key in users)
    {
        el++;
        if(users[key] === id)
        {
            break;
        }
    }

    const idx = users.find((user) => {
        return user.id === id
    });

    if(el!=-1)
    {
        users.splice(el,1);
        return idx;
    }
}

const getuser = (name) => {
    return users.find((user) => user.name === name);
}

const getuserinroom = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = {addUser, removeuser, getuser, getuserinroom, users};