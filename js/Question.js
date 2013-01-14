function Question(id, type, label, hasImage, imageURL, answers) {
        this.id = id;
        this.type = type;        
        this.label = label;
        this.hasImage = hasImage;
        this.answers = answers;
        this.imageURL = imageURL;
}

Question.prototype.getLabel = function() {
        return this.label;
}
                        
