function initData(data) {
    // ----1.置灰；
    let arr_floors = [];
    let arr_rooms = [];
    let selectedRoom = {};
    let selectedBuilding = {};
    let selectedFloor = {};
    // let count_buildings=0;
    for (let i = 0; i < data.length; i++) {
        let count_floors = 0;
        let floors = data[i].children;
        data[i].status = "up";
        data[i].active = "no";
        for (let j = 0; j < floors.length; j++) {
            let count_rooms = 0;
            let rooms = floors[j].children;
            floors[j].status = "up";
            floors[j].active = "no";
            for (let k = 0; k < rooms.length; k++) {
                rooms[k].active = "no";
                if (rooms[k].status === "down") {
                    count_rooms++;
                }
            }
            if (count_rooms === rooms.length) {
                floors[j].status = "down";
                count_floors++;
            }
        }
        if (count_floors === floors.length) {
            data[i].status = "down";
        }
    }
    // ------data已经处理过，楼号、楼层置灰处理；
    // --------------高亮显示；
    for (let i = 0; i < data.length; i++) {
        if (data[i].status === "up") {
            data[i].active = "yes";
            selectedBuilding = data[i];
            let floors = data[i].children;
            arr_floors = data[i].children;
            for (let j = 0; j < floors.length; j++) {
                if (floors[j].status === "up") {
                    floors[j].active = "yes";
                    selectedFloor = floors[j];
                    let rooms = floors[j].children;
                    arr_rooms = floors[j].children;
                    for (let k = 0; k < rooms.length; k++) {
                        if (rooms[k].status === "up") {
                            rooms[k].active = "yes";
                            selectedRoom = rooms[k];
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
    return {
        buildings: data,
        floors: arr_floors,
        rooms: arr_rooms,
        selectedRoom: selectedRoom,
        selectedBuilding,
        selectedFloor
    }
}
function chooseBuilding(data, item) {
    let arr_floors = [];
    let arr_rooms = [];
    let selectedRoom = {};
    let selectedBuilding = {};
    let selectedFloor = {};
    // 重置active；
    for (let i = 0; i < data.length; i++) {
        data[i].active = "no";
        let floors = data[i].children;
        for (let j = 0; j < floors.length; j++) {
            floors[j].active = "no";
            let rooms = floors[j].children;
            for (let k = 0; k < rooms.length; k++) {
                rooms[k].active = "no";
            }
        }
    }
    // ---赋值active；
    for (let i = 0; i < data.length; i++) {
        if (item.id === data[i].id) {
            // 已经找到楼号；
            data[i].active = "yes";
            selectedBuilding = data[i];
            arr_floors = data[i].children;
            let floors = data[i].children;
            for (let j = 0; j < floors.length; j++) {
                if (floors[j].status === "up") {
                    floors[j].active = "yes";
                    selectedFloor = floors[j];
                    let rooms = floors[j].children;
                    arr_rooms = floors[j].children;
                    for (let k = 0; k < rooms.length; k++) {
                        if (rooms[k].status === "up") {
                            rooms[k].active = "yes";
                            selectedRoom = rooms[k];
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
    return {
        buildings: data,
        floors: arr_floors,
        rooms: arr_rooms,
        selectedRoom: selectedRoom,
        selectedBuilding,
        selectedFloor
    }
}
function chooseFloor(data, building, item) {
    // 点击楼层的时候，楼号不需要变；
    let arr_floors = [];
    let arr_rooms = [];
    let selectedRoom = {};
    let selectedFloor = {};
    // 重置楼层的active；
    for (let i = 0; i < data.length; i++) {
        let floors = data[i].children;
        for (let j = 0; j < floors.length; j++) {
            floors[j].active = "no";
            let rooms = floors[j].children;
            for (let k = 0; k < rooms.length; k++) {
                rooms[k].active = "no";
            }
        }
    }
    // ---赋值active；
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === building.id) {
            let floors = data[i].children;
            for (let j = 0; j < floors.length; j++) {
                if (floors[j].id === item.id) {
                    floors[j].active = "yes";
                    selectedFloor = floors[j];
                    arr_floors = data[i].children;
                    let rooms = floors[j].children;
                    arr_rooms = floors[j].children;
                    for (let k = 0; k < rooms.length; k++) {
                        if (rooms[k].status === "up") {
                            rooms[k].active = "yes";
                            selectedRoom = rooms[k];
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
    return {
        buildings: data,
        floors: arr_floors,
        rooms: arr_rooms,
        selectedRoom,
        selectedFloor
    }
}
function chooseRoom(data, building, floor, item) {
    // 点击房号的时候，楼号、楼层不需要变；
    let arr_floors = [];
    let arr_rooms = [];
    let selectedRoom = {};
    // 重置房号的active；
    for (let i = 0; i < data.length; i++) {
        let floors = data[i].children;
        for (let j = 0; j < floors.length; j++) {
            let rooms = floors[j].children;
            for (let k = 0; k < rooms.length; k++) {
                rooms[k].active = "no";
            }
        }
    }
    // ---赋值active；
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === building.id) {
            let floors = data[i].children;
            for (let j = 0; j < floors.length; j++) {
                if (floors[j].id === floor.id) {
                    let rooms = floors[j].children;
                    for (let k = 0; k < rooms.length; k++) {
                        if (rooms[k].id === item.id) {
                            rooms[k].active = "yes";
                            selectedRoom = rooms[k];
                            arr_floors = data[i].children;
                            arr_rooms = floors[j].children;
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
    return {
        buildings: data,
        floors: arr_floors,
        rooms: arr_rooms,
        selectedRoom: selectedRoom
    }
}
function addKey(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].active = "no";
        data[i].status = "";
        let floors = data[i].children;
        for (let j = 0; j < floors.length; j++) {
            floors[j].active = "no";
            floors[j].status = "";
            let rooms = floors[j].children;
            for (let k = 0; k < rooms.length; k++) {
                rooms[k].active = "no";
            }
        }
    }
    return data;
}
function initData1(data, index = 0) {
    // ---------------------------变量；
    // ----currentHouseIndex;
    //-----currentFloorIndex;
    //-----currentRoomIndex;
    // ----choosedRoom;

    // ===================================================初始化；
    //----------------------------------1.置灰
    // 所有的room都下架，则当前楼层置灰
    // 所有的楼层都置灰，则当前的楼号置灰
    // ---------------------------------2.默认高亮
    // 筛选未置灰的楼号中选择第一个作为高亮显示
    // 楼号选定后，筛选未置灰的楼层中第一个作为高亮显示
    // 楼层选定后，筛选未置灰的room中第一个作为高亮显示
    // return choosedRoom;
    // ===================================================点击交互
    // ----------------------------------case1 点击楼号
    // 置灰的楼号直接return
    // 被点击的未置灰的楼号记录index值，将其改为高亮-->需要封装getActiveHouseIndex(index=>...currentHouseIndex)，其他的要置灰；
    // 传入楼号currentHouseIndex值，筛选未置灰的楼层第一个index值，记录currentFloorIndex,其他的要置灰；
    // 传入currentFloorIndex值，筛选未置灰的楼层第一个index值，记录currentRoomIndex值，其他的要置灰；
    // return choosedRoom;
    // ----------------------------------case2 点击楼层
    // currentHouseIndex传入，currentFloorIndex值变为当前被点击的index值，其他的要置灰；
    // 传入currentFloorIndex值，筛选未置灰的楼层第一个index值，记录currentRoomIndex值，其他的要置灰
    // return choosedRoom;
    // ----------------------------------case3 点击房间
    // 传入currentHouseIndex,currentFloorIndex,记录被选中的currentRoomIndex值，其他的要置灰；
    // return choosedRoom;

}
export {
    addKey,
    initData,
    chooseBuilding,
    chooseFloor,
    chooseRoom
}