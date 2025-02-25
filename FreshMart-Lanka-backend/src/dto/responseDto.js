class ResponseDto {
    constructor(status, description, data) {
        this.status = status;
        this.description = description;
        this.data = data;
    }
}

module.exports = ResponseDto