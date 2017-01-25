# telekit-cmd
The module that simplifies work with commands into [telekit](https://github.com/telekits/telekit)  

## Install
npm:
```
$ npm install telekit telekit-cmd --save
```

yarn:
```
$ yarn add telekit telekit-cmd
```

## Usage
```js
/** Require `telekit` and `telekit-cmd` */
const telekit = require('telekit');
const telecmd = require('telekit-cmd');

/** Create a new `telekit` instance */
const bot = telekit(options);

/** Connect `telekit-cmd` to instance */
bot.use(telecmd);

/** And start listening! */
bot.on('/ping', (context) => {
    context.chat.sendMessage({
        text: 'Pong!',
    });
});
```


## Documentation
> Coming soon...


## Examples
> context.command

```js
/** ... */
const bot = telekit(options);
bot.use(telecmd);

bot.message = (context) => {
    if (context.command.name == 'hello') {
        return context.chat.sendMessage({
            text: 'Glad to see you!',
        });
    }
};
```

> Events

```js
/** ... */
const bot = telekit(options);
bot.use(telecmd);

/** Listen of all commands */
bot.on('command', (context) => {
    context.chat.sendMessage({
        text: `Command ${context.command.name} is not implemented 😞`,
    });
});

/** Listens only a given command */
bot.on('/meow', (context) => {
    context.chat.sendMessage({
        text: 'Woof, woooof-woof! 🐶',
    });
});
/** ... */
```


> Method `command` for the instance

```js
/** ... */
const bot = telekit(options);
bot.use(telecmd);

bot.command = (context) => {
    if (context.command.name == 'source') {
        context.chat.sendMessage({
            text: '[Source code available on Github](https://github.com/telekits/telekit-cmd) ❤️️',
            parse_mode: 'markdown',
        });
    }
} 
/** ... */
```


> Method `command` for the custom helpers

```js
/** ... */
const bot = telekit(options);
bot.use(telecmd);

bot.use(class MyBestClassHelper { 
    command(context, next) {
        if (context.command.name == 'start') {
            return context.chat.sendMessage({
                text: 'Welcome to My Super Awesome Bot! 😊',
            });
        }

        next();
    }
});
/** ... */
```

## LICENSE
[MIT](./LICENSE "The MIT License")
