import React from 'react';
import { RepoList } from "../models/Repo";
import { convertToKFormat } from '../utils/numberKformat'

interface RepoDetailsProps {
    data: RepoList;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ data }) => {
    return (
            <div className="card" style={{ maxWidth: '540px', textAlign: 'left', marginBottom: '8px' }}>
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text">{data.description}</p>
                    <div className='row'>
                        <div className='col-8 d-flex align-items-center'>
                            <img
                                src={data.owner.avatar_url}
                                className="img-fluid rounded-start"
                                alt={data.owner.login}
                                style={{ maxHeight: "26px", objectFit: "cover" }}
                            />
                            <small style={{ marginLeft: '8px' }}>{data.owner.login}</small>
                        </div>
                        <div className='col-4 d-flex align-items-center justify-content-end'>
                            <p className="card-text mb-0">
                                <small className="text-muted">⭐ {convertToKFormat(data.stargazers_count)}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default RepoDetails;
