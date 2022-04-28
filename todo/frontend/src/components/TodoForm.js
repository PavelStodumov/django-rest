import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 'project': this.props.projects[0]?.id, 'text': '', 'user': this.props.users[0]?.uid }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.project, this.state.text, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for='project'>project</label>
                    <select name="project" className="form-control" onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>
                            {item.name}
                        </option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label for='text'>text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for='user'>user</label>
                    <select name="user" className="form-control" onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.uid}>
                            {item.username}
                        </option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="save" />
            </form>
        )
    }
}

export default TodoForm