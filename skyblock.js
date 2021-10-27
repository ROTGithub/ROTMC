import { ItemStack, PlayerInventoryComponentContainer, World } from 'mojang-minecraft';
import { Server, Database, Player, Lang, setTickTimeout } from '../../../Minecraft.js';
var skyblock_data = new Database("skyblock_data");
var inventory_backups = new Database("inventory_backups");
var ticks = 0;
var generate_island_list = [];
var skyblock_shop = [
    {
        "name": "Diamond",
        "id": "1",
        "item_id": "diamond",
        "price": 100,
        "count": 2,
        "sell_price": 20
    },
    {
        "name": "Iron Ingot",
        "id": "2",
        "item_id": "iron_ingot",
        "price": 50,
        "count": 5,
        "sell_price": 6
    },
    {
        "name": "Coal",
        "id": "3",
        "item_id": "coal",
        "price": 20,
        "count": 8,
        "sell_price": 1
    },
    {
        "name": "Flint",
        "id": "4",
        "item_id": "flint",
        "price": 4,
        "count": 2,
        "sell_price": 1
    },
    {
        "name": "Sand",
        "id": "5",
        "item_id": "sand",
        "price": 150,
        "count": 48,
        "sell_price": 1
    },
    {
        "name": "Grass",
        "id": "6",
        "item_id": "grass",
        "price": 170,
        "count": 64,
        "sell_price": 1
    }
];
Server.on('tick', () => {
    ticks++;
Server.runCommand(`scoreboard players add @a clsre 1`)
if(generate_island_list.length == 0) return;
for(let i = 0;i < generate_island_list.length;i++) {
        var nametag = generate_island_list[i];
        Server.runCommand(`tp @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)}`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~-15 ~-15 ~-15 ~15 ~15 ~15 barrier 0 hollow`);
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} setblock ~ 199 ~ glass`);
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~5 ~-1 ~5 ~ ~-1 ~ grass`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~5 ~-2 ~5 ~ ~-2 ~ dirt`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~5 ~-3 ~5 ~ ~-3 ~ dirt`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~5 ~-4 ~5 ~ ~-4 ~ bedrock`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~3 ~-1 ~3 ~6 ~-1 ~6 air`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~3 ~-2 ~3 ~6 ~-2 ~6 air`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~3 ~-2 ~3 ~6 ~-3 ~6 air`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} fill ~3 ~-2 ~3 ~6 ~-4 ~6 air`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} setblock ~1 ~ ~1 chest`)
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} replaceitem block ~1 ~ ~1 slot.container 0 sapling 1 0`);
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} replaceitem block ~1 ~ ~1 slot.container 1 bone_meal 19`);
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} replaceitem block ~1 ~ ~1 slot.container 2 lava_bucket`);
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} replaceitem block ~1 ~ ~1 slot.container 3 water_bucket`);
        Server.runCommand(`execute @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)} replaceitem block ~1 ~ ~1 slot.container 4 bed`);
        Server.runCommand(`tp @a[name="${nametag}"] ${skyblock_data.get(`${nametag}_x`)} ${skyblock_data.get(`${nametag}_y`)} ${skyblock_data.get(`${nametag}_z`)}`)
        Server.runCommand(`effect @a[name="${nametag}"] resistance 0`);
        Server.runCommand(`tickingarea remove tmpskyblock`);
        var x = Server.runCommand(`execute @a[name="${nametag}"] ~ ~ ~ testforblock ~ ~-1 ~ grass`);
        if(x.error) return;
        var x2 = Server.runCommand(`execute @a[name="${nametag}"] ~ ~ ~ testforblock ~ ~-15 ~ barrier`);
        if(x2.error) return;
        generate_island_list = [];
        
    ticks = 0;
}
});
Server.command.register({
    cancelMessage: true,
    name: `is`,
    usage: `is (create)`
},(chatmsg,args)=> {
    if(args[0] == "create") {
        if(skyblock_data.has(`player_${chatmsg.sender.nameTag}`)) return;
        skyblock_data.set(`og_x_${chatmsg.sender.nameTag}`,(Math.trunc(chatmsg.sender.location.x)).toString());
        skyblock_data.set(`og_y_${chatmsg.sender.nameTag}`,(Math.trunc(chatmsg.sender.location.y)).toString());
        skyblock_data.set(`og_z_${chatmsg.sender.nameTag}`,(Math.trunc(chatmsg.sender.location.z)).toString());
        if(!skyblock_data.get("last_island_location_x")) skyblock_data.set("last_island_location_x","0");
        if(!skyblock_data.get("last_island_location_z")) skyblock_data.set("last_island_location_z","0");
        var y_default = 200;
        var x = 61000 + (parseInt(skyblock_data.get("last_island_location_x")) + 2000);
        var z = 61000 + (parseInt(skyblock_data.get("last_island_location_z")) + 2000);
        skyblock_data.set("last_island_location_x",(parseInt(skyblock_data.get("last_island_location_x")) + 2000).toString());
        if((parseInt(skyblock_data.get("last_island_location_x")) + 2000) > 400000) {
            skyblock_data.set("last_island_location_x","0");
            skyblock_data.set("last_island_lcoation_z",(parseInt(skyblock_data.get("last_island_location_z")) + 2000))
        }
        skyblock_data.set(`${chatmsg.sender.nameTag}_y`,y_default.toString());
        skyblock_data.set(`${chatmsg.sender.nameTag}_x`,x.toString());
        skyblock_data.set(`${chatmsg.sender.nameTag}_z`,z.toString());
        skyblock_data.set(`player_${chatmsg.sender.nameTag}`,`1`);
        Server.runCommand(`tp @a[name="${chatmsg.sender.nameTag}"] ${x.toString()} ${y_default.toString()} ${z.toString()}`)
        ticks = 0;
        Server.runCommand(`effect @a[name="${chatmsg.sender.nameTag}"] resistance 10000000 255 true`);
        Server.runCommand(`tickingarea add circle ${x.toString()} ${y_default.toString()} ${z.toString()} 4 tmpskyblock`)
        generate_island_list.push(chatmsg.sender.nameTag)
    } else if(args[0] == "tp") {
        if(!skyblock_data.has(`player_${chatmsg.sender.nameTag}`)) return;
        skyblock_data.set(`og_x_${chatmsg.sender.nameTag}`,(Math.trunc(chatmsg.sender.location.x)).toString());
        skyblock_data.set(`og_y_${chatmsg.sender.nameTag}`,(Math.trunc(chatmsg.sender.location.y)).toString());
        skyblock_data.set(`og_z_${chatmsg.sender.nameTag}`,(Math.trunc(chatmsg.sender.location.z)).toString());
        Server.runCommand(`tp @a[name="${chatmsg.sender.nameTag}"] ${skyblock_data.get(`${chatmsg.sender.nameTag}_x`)} ${skyblock_data.get(`${chatmsg.sender.nameTag}_y`)} ${skyblock_data.get(`${chatmsg.sender.nameTag}_z`)}`)
    } else if(args[0] == "del") {
        skyblock_data.delete(`player_${chatmsg.sender.nameTag}`);
        skyblock_data.delete(`${chatmsg.sender.nameTag}_x`);
        skyblock_data.delete(`${chatmsg.sender.nameTag}_y`);
        skyblock_data.delete(`${chatmsg.sender.nameTag}_z`);
    } else if(args[0] == "back") {
        if(!skyblock_data.has(`og_x_${chatmsg.sender.nameTag}`)) return;
        var ogx = skyblock_data.get(`og_x_${chatmsg.sender.nameTag}`);
        var ogy = skyblock_data.get(`og_y_${chatmsg.sender.nameTag}`);
        var ogz = skyblock_data.get(`og_z_${chatmsg.sender.nameTag}`);
        Server.runCommand(`tp @a[name="${chatmsg.sender.nameTag}"] ${ogx} ${ogy} ${ogz}`);
    } else if(args[0] == "shop") {
        if(args[1] == "list") {
            Server.broadcast(`Use "!is shop buy <ID>" to buy an item!`,chatmsg.sender.nameTag);
            for(let i = 0;i < skyblock_shop.length;i++) {
                var item = skyblock_shop[i];
                if(!item.name) return;
                if(!item.id) return;
                if(!item.item_id) return;
                if(!item.price) return;
                if(!item.count) return;
                Server.broadcast(`Name: ${item.name}`,chatmsg.sender.nameTag);
                Server.broadcast(`ID: ${item.id}`,chatmsg.sender.nameTag);
                Server.broadcast(`Price: ${item.price.toString()}`,chatmsg.sender.nameTag);
                Server.broadcast(`Count: ${item.count.toString()}`,chatmsg.sender.nameTag);
//                Server.broadcast(`Sell Price: ${item.count.toString()}`,chatmsg.sender.nameTag);                
                Server.broadcast(`===============`,chatmsg.sender.nameTag);
            }
        } else if(args[1] == "buy") {
            for(let i = 0;i < skyblock_shop.length;i++) {
                if(skyblock_shop[i].id == args[2]) {
                    var player_money = Player.getScore('clmoney',chatmsg.sender.nameTag);
                    if(player_money >= skyblock_shop[i].price) {
                        var player_money_new = player_money;
                        player_money_new = player_money_new - skyblock_shop[i].price;
                        Server.runCommand(`give @a[name="${chatmsg.sender.nameTag}"] ${skyblock_shop[i].item_id} ${skyblock_shop[i].count.toString()} 0`);

                        Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.nameTag}"] clmoney ${player_money_new.toString()}`);
                    }
                    return;
                }
            }
        } else if(args[1] == "collect") {
            var time_played = Player.getScore("clsre",chatmsg.sender.nameTag);
            if(!time_played) return;
            var time_played_new = time_played;
            if(time_played_new < 86400) return Server.broadcast(`You cannot collect money right now, try again later.`,chatmsg.sender.nameTag);
            var current_money = 0;
            while(time_played_new >= 86400) {
                time_played_new = time_played_new - 86400;
                Server.runCommand(`scoreboard players add @a[name="${chatmsg.sender.nameTag}"] clmoney 350`);
                current_money += 350;
            }
            Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.nameTag}"] clsre 0`);
            Server.broadcast(`You earned $${current_money.toString()}`,chatmsg.sender.nameTag);
        }
    }
})
Server.command.register({
    cancelMessage: true,
    name: `server-shop`,
    description: `Server Shop`,
    usage: `help`
},(chatmsg,args)=> {
    if(!args.length) return;
    if(args[0] == "set") {
        if(args.length < 3) return Server.broadcast(`Please type a price!`,chatmsg.sender.nameTag);
        if (!Server.player.findTag('v', chatmsg.sender.nameTag))
            return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`, `tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
        var Command1 = Server.runCommand(`execute @a[name="${chatmsg.sender.nameTag}"] ~ ~ ~ testfor @e[type=item,r=9]`);
        if(Command1.error) return Server.broadcast(`ERROR: No item found in the radius of 9 blocks!`,chatmsg.sender.nameTag);
        var RandomID = Math.floor(Math.random() * 10000000);
        var Command2 = Server.runCommand(`execute @a[name="${chatmsg.sender.nameTag}"] ~ ~ ~ execute @e[type=item,r=9] ~ ~ ~ structure save rot:shop${args[2]} ~ ~ ~ ~ ~ ~ true`)
        var server_shop_data = new Database("server_shop_data");
        var return_error_price_not_int = false;
        for(let i = 0;i < args[1].length;i++) {
            var char = args[1][i];
            if(char != "0" && char != "1" && char != "2" && char != "3" && char != "4" && char != "5" && char != "6" && char != "7" && char != "8" && char != "9") return_error_price_not_int = true;
        }
        
        if(return_error_price_not_int) return Server.broadcast(`The price must be a number!`,chatmsg.sender.nameTag);
        server_shop_data.set(`shop_${args[2]}`,`rot:shop${args[2]}`);
        if(!server_shop_data.has("shop_item_ids")) {
            server_shop_data.set("shop_item_ids",`${args[2]}?${args[1]}`);
        } else {
            var current_server_shop_data = server_shop_data.get("shop_item_ids");
            server_shop_data.set("shop_item_ids",`${current_server_shop_data}/n//${args[2]}?${args[1]}`)
        }
    } else if(args[0] == "list") {
        var server_shop_data = new Database("server_shop_data");
        if(server_shop_data.has("shop_item_ids")) {
            var shop_item_ids = server_shop_data.get("shop_item_ids").split('/n//');
            Server.broadcast(`Use "server-shop buy <Item ID>" to buy an item!`,chatmsg.sender.nameTag);
            for(let i = 0;i < shop_item_ids.length;i++) {
                if(server_shop_data.has(`description_${shop_item_ids[i].split('?')[0]}`)) {
                    Server.broadcast(`Description: ${server_shop_data.get(`description_${shop_item_ids[i].split('?')[0]}`)}`,chatmsg.sender.nameTag);
                } else {
                    Server.broadcast(`Description: None`,chatmsg.sender.nameTag);
                }
                Server.broadcast(`ID: ${shop_item_ids[i].split('?')[0]}`,chatmsg.sender.nameTag);
                Server.broadcast(`Price: ${shop_item_ids[i].split('?')[1]}`,chatmsg.sender.nameTag);
                Server.broadcast(`-=-=-=-=-=-`,chatmsg.sender.nameTag);
            }
        } else {
            Server.broadcast(`There are no items yet!`,chatmsg.sender.nameTag);
        }
    } else if(args[0] == "set-description") {
        if(args.length == 1) return;
        if(args.length == 2) return;
        if (!Server.player.findTag('v', chatmsg.sender.nameTag))
            return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`, `tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
        var server_shop_data = new Database("server_shop_data");
        server_shop_data.set(`description_${args[1]}`,args.join(' ').replace(`set-description ${args[1]} `,``));
    } else if(args[0] == "buy") {
        var player_money = Player.getScore('clmoney',chatmsg.sender.nameTag);
        var server_shop_data = new Database("server_shop_data");
        if(server_shop_data.has("shop_item_ids")) {
            var shop_item_ids = server_shop_data.get("shop_item_ids").split('/n//');
            var item_exists = false;
            for(let i = 0;i < shop_item_ids.length;i++) {
                if(shop_item_ids[i].split('?')[0] == args[1]) {
                    item_exists = true;
                }
            }
            if(item_exists) {
                var item_id = shop_item_ids.filter((e)=>e.startsWith(args[1]))[0].split('?')[1];
                if(player_money >= parseInt(item_id)) {
                    Server.runCommand(`execute @a[name="${chatmsg.sender.nameTag}"] ~ ~ ~ structure load rot:shop${args[1]} ~ ~ ~`);
                    Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.nameTag}"] clmoney ${(player_money-parseInt(item_id)).toString()}`)
                } else {
                    return Server.broadcast(`You don't have enough money`,chatmsg.sender.nameTag);
                }
            }
        }
    }
})
/*
    if(args[0] == "get") {
        for(let i = 0;i < chatmsg.sender.getComponents().length;i++) {
        Server.broadcast(JSON.stringify(chatmsg.sender.getComponents()[i])+"\n\n");
        }
    } else if(args[0] == "backup") {
        var inventory = chatmsg.sender.getComponent("minecraft:inventory");
        for(let i = 0;i < inventory.inventorySize;i++) {
            var item = inventory.container.getItem(i);
            if(item != undefined) {
                inventory_backups.set(`${chatmsg.sender.nameTag}_${args[1]}_size`,inventory.inventorySize.toString());
                inventory_backups.set(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_id`,item.id);
                inventory_backups.set(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_amount`,item.amount.toString());
                inventory_backups.set(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_data`,item.data.toString());
            } else {
                inventory_backups.set(`${chatmsg.sender.nameTag}_${args[1]}_size`,inventory.inventorySize.toString());
                inventory_backups.set(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_id`,"minecraft:air");
                inventory_backups.set(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_amount`,"0");
                inventory_backups.set(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_data`,"0");
            }
        }
    } else if(args[0] == "load") {
        if(!inventory_backups.has(`${chatmsg.sender.nameTag}_${args[1]}_size`)) return;
        var size = parseInt(inventory_backups.get(`${chatmsg.sender.nameTag}_${args[1]}_size`));
        var inventory = chatmsg.sender.getComponent("minecraft:inventory");
        for(let i = 0;i < size;i++) {
            var item = new ItemStack(inventory_backups.get(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_id`),parseInt(inventory_backups.get(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_amount`)),parseInt(inventory_backups.get(`${chatmsg.sender.nameTag}_${args[1]}_${i.toString()}_data`)));
            inventory.container.setItem(i,item);
        }        
    }
*/