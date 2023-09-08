class employeeDTO{
    constructor(employee){
        this._id = employee._id;
        this.applied_for = employee.applied_for;
        this.name = employee.name;
        this.email = employee.email;
        this.gender = employee.gender;
        this.phone = employee.phone;
        this.cnic = employee.cnic;
        this.type = employee.type;
        this.status = employee.status;
        this.remarks = employee.remarks;
        this.city = employee.city;
        this.applied_date = employee.applied_date;
        this.created_by = employee.created_by;
        this.createdAt = employee.createdAt;

    }
}
module.exports = employeeDTO