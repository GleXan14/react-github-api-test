import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomTable from "../components/table.component";
import { UserRepo } from "../models/user-repos.model";
import { User } from "../models/user.model";
import GithubService from "../services/github.service";
import CustomModal from "../components/modal.component";

function UserDetailsPage(){

    const [user, setUser] = useState<User | null>(null);
    const [repos, setRepos] = useState<UserRepo[]>([]);
    const [repoSelected, setRepoSelected] = useState<UserRepo | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const {username} = useParams();

    useEffect(() => {

        loadUserData();

        return () => {
            setUser(null);
        }
    }, [])

    const loadUserData = async () => {
        const userData = await GithubService.getUser(`${username}`);
        const repos = await GithubService.getRepos(userData.username as string, 100);

        userData.repos = [...repos];

        setUser(userData);
        setRepos(userData.repos.slice(0, 25));
    }

    const handleRepoPageChange = async (newPage: number, rowsPerPage:number) => {
        const start:number = (newPage*rowsPerPage);
        const end:number = start+rowsPerPage;
        const allRepos = [...user?.repos as UserRepo[]];

        setRepos(allRepos.slice(start, end));
    }

    const handleDetailsClick = (row:UserRepo) => {
        const repoSelected = repos.find((repo) => repo.id === row.id);
        setRepoSelected(repoSelected!);
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setRepoSelected(null);
    }


    return (
        <div className="details-container">
            <div className="details-title">
                <h3>Datos generales</h3>
            </div>
            <hr></hr>
            <div className="details">
                <div className="detail">
                    <h4>Usuario</h4>
                    <p>{user?.username ? user?.username : 'N/A'}</p>
                </div>
                <div className="detail">
                    <h4>Nombre real</h4>
                    <p>{user?.name ? user?.name : 'N/A'}</p>
                </div>
                <div className="detail">
                    <h4>Email</h4>
                    <p>{user?.email ? user?.email : 'N/A'}</p>
                </div>

                <div className="detail" style={{flexBasis: "100%"}}>
                    <h4>Direccion</h4>
                    <p>{user?.location ? user?.location : 'N/A'}</p>
                </div>
                <div className="detail" style={{flexBasis: "100%"}}>
                    <h4>Bio</h4>
                    <p>{user?.bio ? user?.bio : 'N/A'}</p>
                </div>

                <div className="detail" >
                    <h4>Seguidores</h4>
                    <p>{user?.followers}</p>
                </div>
                <div className="detail" >
                    <h4>Seguidos</h4>
                    <p>{user?.following}</p>
                </div>

                <div className="detail" >
                    <h4>Repositorios</h4>
                    <p>{user?.reposCount}</p>
                </div>

            </div>
            <div className="details-title">
                <h3>Repositorios</h3>
            </div>
            <hr></hr>

            <CustomTable 
                headers={['ID', 'NOMBRE']}
                data={repos.map((repo) => {
                    return {id: repo.id, name: repo.name}
                })}
                onPageChange={handleRepoPageChange}
                count={user?.repos.length ? user?.repos.length : 100}
                onDetailsClick={handleDetailsClick}
            />

            <CustomModal 
                title={repoSelected ? repoSelected.name! : ""}
                description={repoSelected ? repoSelected.description! : ""}
                actions={[
                    {
                        text: "VER REPOSITORIO",
                        onClick: () => window.open(repoSelected ? repoSelected.url! : "", '_blank')
                    }
                ]}
                additionals={[
                    {
                        label: "Lenguaje principal",
                        value: repoSelected ? repoSelected.language! : ""
                    }
                ]}
                open={modalOpen}
                onModalClose={handleModalClose}
            />
        </div>
    )
}
export default UserDetailsPage;