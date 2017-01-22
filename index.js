/**
 * This extend module for `telekit` that adds support of commands
 *
 * @module telekit-cmd
 * @author Denis Maslennikov <mrdenniska@gmail.com> (nofach.com)
 * @license MIT
 */

/**
 * Constants
 * @private
 */
const RE_BOT_COMMAND = /^\/([a-z0-9\-\_]+)(\@[a-z0-9\-\_]+)?$/i;

/**
 * Methods
 * @private
 */
function parseEntityBotCommand(text, entity) {
    let result = RE_BOT_COMMAND.exec(text.substr(
        entity.offset,
        entity.length
    ));

    return {
        type: entity.type,
        name: result[1],
        mention: result[2],
    };
}

function parseEntity(text, entity) {
    return {
        type: entity.type,
        value: text.substr(entity.offset, entity.length),
    };
}

function parse(update) {
    let result = null;

    if (!update.text || update.text[0] != '/' || !update.entities) {
        return false;
    }

    result = { text: update.text, entities: [] };
    update.entities.forEach((item) => {
        if (item.type == 'bot_command') {
            return result.entities.push(parseEntityBotCommand(
                update.text,
                item
            ));
        }

        result.entities.push(parseEntity(
            update.text,
            item
        ));
    });

    return result;
}

/**
 * Implementation
 * @public
 */
function telekit_cmd(telekit) {
    let handler = (context) => {
        let command = parse(context.update);

        if (command) {
            command.name = command.entities[0].name;
            command.mention = command.entities[0].mention;

            context.isCommand = true;
            context.command = command;

            telekit.emit('command', context);
            telekit.emit(`/${context.command.entities[0].name}`, context);

            if (telekit.command) {
                telekit.command(context);
            }

            telekit.middleware.transmit('command', context);

            return;
        }

        context.isCommand = false;
        context.command = null;
    };

    telekit.on('message', handler);
    telekit.on('post', handler);
}

/** Exports */
module.exports = telekit_cmd;
