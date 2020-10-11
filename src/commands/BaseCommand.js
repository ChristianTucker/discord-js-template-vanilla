module.exports = class BaseCommand {
    name = 'BaseCommand'
    description = 'This should be excluded from your command list, or moved to a different folder.'

    execute({ client, msg }) {
        throw `Execute not implemented for ${name}`;
    }
}