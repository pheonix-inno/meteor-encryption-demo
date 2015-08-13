Messages = new Mongo.Collection("messages");

MessagesSchema = new SimpleSchema({
    // user id
    chatPartner: {
        type: String,
        label: "Chat Partner",
    },
    // user id
    author: {
        type: String,
        label: "Author"
    },
    date: {
        type: Date,
        label: "Date"
    },
    message: {
        type: String,
        label: "Message",
        max: 1000
    }
});
if (Meteor.isClient) {
    // define fields to be encrypted
    var fields = ['message'];
    // init encryption on collection Messages
    DataObjectsEncryption = new CollectionEncryption(Messages, 'message',
        fields, MessagesSchema, false);
}
