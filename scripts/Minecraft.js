/*
ROT Developers and Contributors:
Moises (OWNER/CEO),
TRASH (DEVELOPER),
notbeer (Most of ROT's Structure code),
Nightwalker L.o.t.s (ROT Anti Cheat Dev),
UnknownCatastrophe (ROT Anti Cheat Dev),
VUnkownPersonV (ROT Anti Cheat Dev),
__________ ___________________
\______   \\_____  \__    ___/
 |       _/ /   |   \|    |
 |    |   \/    |    \    |
 |____|_  /\_______  /____|
        \/         \/
Do NOT steal, copy the code, or claim it as yours!
Please message moisesgamingtv0#8583 on Discord, or join the ROT discord: https://discord.com/invite/2ADBWfcC6S
You can also message one of our developers on Discord @TRASH#6969
Copyright 2021-2022!
Thank you!
*/
import { clearTickInterval, clearTickTimeout, setTickInterval, setTickTimeout } from "./build/utils/scheduling.js";
export { clearTickInterval, clearTickTimeout, setTickInterval, setTickTimeout };
import { compressNumber, formatNumber, MS, rainbowText } from "./build/utils/formatter.js";
export { compressNumber, formatNumber, MS, rainbowText };
import Database from "./build/classes/databaseBuilder.js";
export { Database };
import { World } from 'mojang-minecraft';
import { Entity } from "./build/classes/entityBuilder.js";
import { Player } from "./build/classes/playerBuilder.js";
export { Player };
import { Command } from "./build/classes/commandBuilder.js";
import { LangImport } from "./puller.js";
import { ServerBuilder } from "./build/classes/serverBuilder.js";
export class LangO extends LangImport {
}
;
class ServerBuild extends ServerBuilder {
    constructor() {
        super();
        this.entity = Entity;
        this.player = Player;
        this.command = Command;
        this._buildEvent();
    }
    ;
    /**
     * @private
     */
    _buildEvent() {
        World.events.beforeChat.subscribe(data => {
            const date = new Date();
            /**
             * Emit to 'beforeMessage' event listener
             */
            this.emit('beforeMessage', data);
            /**
             * This is for the command builder and a emitter
             */
            if (!data.message.startsWith(this.command.prefix))
                return;
            const args = data.message.slice(this.command.prefix.length).trim().split(/\s+/);
            const command = args.shift().toLowerCase();
            const getCommand = Command.getAllRegistation().some(element => element.name === command || element.aliases && element.aliases.includes(command));
            if (!getCommand) {
                data.cancel = true;
                return this.runCommand(`tellraw "${data.sender.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["§f${command}§c"]}]}`);
            }
            ;
            Command.getAllRegistation().forEach(element => {
                if (!data.message.startsWith(this.command.prefix) || element.name !== command)
                    return;
                /**
                 * Registration callback
                 */
                if (element?.cancelMessage)
                    data.cancel = true;
                try {
                    element.callback(data, args);
                }
                catch (error) {
                    this.broadcast(`§c${error}`, data.sender.nameTag);
                }
                ;
                /**
                 * Emit to 'customCommand' event listener
                 */
                this.emit('customCommand', {
                    registration: element,
                    data,
                    createdAt: date,
                    createdTimestamp: date.getTime()
                });
            });
        });
        /**
         * Emit to 'messageCreate' event listener
         */
        World.events.chat.subscribe(data => this.emit('messageCreate', data));
        /**
         * Emit to 'entityEffected' event listener
         */
        World.events.effectAdd.subscribe(data => this.emit('entityEffected', data));
        /**
         * Emit to 'weatherChange' event listener
         */
        World.events.weatherChange.subscribe(data => this.emit('weatherChange', data));
        let oldPlayer = [];
        World.events.entityCreate.subscribe(data => {
            /**
             * Emit to 'entityCreate' event listener
             */
            this.emit('entityCreate', data);
            if (data.entity.id !== 'minecraft:player')
                return;
            let playerJoined = Player.list().filter(current => !oldPlayer.some(old => current === old));
            /**
             * Emit to 'playerJoin' event listener
             */
            if (playerJoined.includes(data.entity.nameTag))
                this.emit('playerJoin', data.entity);
        });
        let worldLoaded = false, tickCount = 0;
        World.events.tick.subscribe(() => {
            /**
             * Emit to 'tick' event listener
             */
            this.emit('tick');
            let currentPlayer = Player.list();
            let playerLeft = oldPlayer.filter(old => !currentPlayer.some(current => old === current));
            /**
             * Emit to 'playerLeave' event listener
             */
            for (let player of playerLeft)
                this.emit('playerLeave', { name: player });
            oldPlayer = currentPlayer;
            tickCount++;
            if (!this.runCommand('testfor @a').error && !worldLoaded) {
                /**
                 * Emit to 'ready' event listener
                 */
                this.emit('ready', { loadTime: tickCount });
                worldLoaded = true;
            }
            ;
        });
    }
    ;
}
;
/**
 * Import this constructor
 */
export const Server = new ServerBuild();
export const Lang = new LangO();
