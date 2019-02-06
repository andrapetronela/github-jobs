class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        }
    }
    
    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=python') 
            .then(response => response.json())
            .then(data => {
                this.setState({
                    jobs: data
                })
            })
    }
     
    render() {

        const jobs = this.state.jobs.map((job, index) => {
            let d = this.state.jobs[index].created_at;
                d = d.split(' ');
                let my_date = d[2] +' ' + d[1] + ' ' + d[5];
            return (
                <div className="card" key={index}>
                    <h1>{this.state.jobs[index].title}</h1>
                    <p>{this.state.jobs[index].type}</p>
                    <p>Location: {this.state.jobs[index].location}</p>
                    <p>Company: {this.state.jobs[index].company}</p>
                    <p>Date: { my_date }</p>
                    <a href={this.state.jobs[index].url} target='_blank'>
                        Read more
                    </a>
                </div>
            )
        
        })
        return (
            <div className='container'>
                <header>
                    <h1>GitHub Jobs</h1>
                    <p>Researching Python developers</p>
                </header>
                <main className="cards-container">
                    { jobs }
                </main>
                
            </div>
        )
    }
}



ReactDOM.render(<Jobs />, document.getElementById('root'));