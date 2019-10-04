// import React, { Component, Fragment } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'

// import Spinner from '../../common/Spinner'
// import ProjectPreview from './ProjectPreview'

// import store from '../../../../store'

// import cx from 'classnames'
// import styles from './Project.module.sass'
// import gridStyles from './ProjectGrid.module.sass'

// import {
//   getAllProjects,
//   getProjectsAfterTen,
//   getProjectById,
//   getGridTopTen,
//   clearCurrentProject,
//   hasBackgroundImage
// } from '../../../../actions/projectActions'
// import { rankOptions } from '../../../config/config'

// // if (this.props.project.project) {

// // import './projects.css'
// class Projects extends Component {
//   state = {
//     isIE11: false
//   }
//   componentDidMount() {
//     if (!!window.MSInputMethodContext && !!document.documentMode) {
//       this.setState({ isIE11: true })
//     }

//     store.dispatch(clearCurrentProject())
//     this.props.hasBackgroundImage(false)
//     this.props.getAllProjects()
//     this.props.getProjectsAfterTen()
//     this.props.getGridTopTen()
//   }

//   fillRemainingRanks = (top10, afterTenProjects, projectList) => {
//     let past10rank = 11
//     let rank
//     // if (afterTenProjects)
//     let maxLength = afterTenProjects.length <= 50 ? afterTenProjects.length : 50
//     for (let i = 0; i < maxLength; i++) {
//       let project = afterTenProjects[i]
//       if (project.images.length > 0) {
//         let imageIndex = 0
//         while (imageIndex < project.images.length) {
//           let image = project.images[imageIndex]
//           if (image.isVisible && !image.isDeleted) {
//             if (top10.length > 0) {
//               rank = top10[0]
//               top10.splice(0, 1)
//             } else {
//               rank = past10rank
//               past10rank++
//             }
//             projectList.push(
//               <div
//                 index={rank}
//                 className={cx(
//                   gridStyles['grid-item'],
//                   gridStyles[`grid-item--${rank}`]
//                 )}
//                 style={{ order: rank }}
//                 key={rank}
//               >
//                 <NavLink
//                   to={{
//                     pathname: '/projekte/' + project._id
//                   }}
//                   params={{ id: project._id }}
//                   activeClassName="active"
//                   onClick={() => this.props.getProjectById(project._id)}
//                 >
//                   <ProjectPreview
//                     project={project}
//                     image={image}
//                     position={rank}
//                     isIE11={this.state.isIE11}
//                   />
//                 </NavLink>
//               </div>
//             )

//             break
//           }
//           imageIndex++
//         }
//       }
//     }
//   }

//   render() {
//     const { projects, toptenProjects, afterTenProjects } = this.props.project
//     let top10 = []
//     for (let i = 1; i <= rankOptions; i++) {
//       top10.push(i.toString())
//     }
//     let projectContent
//     let projectList = []
//     const { isIE11 } = this.state
//     if (
//       projects === null ||
//       toptenProjects === undefined ||
//       afterTenProjects === undefined
//     ) {
//       projectContent = <Spinner />
//     } else {
//       if (projects.noprojects) {
//         projectContent = (
//           <div>
//             <p>{projects.noprojects}</p>
//           </div>
//         )
//       } else {
//         // if (afterTenProjects.length > 1) {
//         //   this.fillRemainingRanks(top10, afterTenProjects, projectList)
//         // }

//         for (let i = 0; i < toptenProjects.length; i++) {
//           if (toptenProjects[i].images.length > 0) {
//             for (let image of toptenProjects[i].images) {
//               if (
//                 image.gridPosition &&
//                 image.isDeleted === false &&
//                 // image.isVisible &&
//                 image.gridPosition !== '-' &&
//                 image.gridPosition !== null
//               ) {
//                 projectList.push(
//                   <div
//                     index={image.gridPosition}
//                     className={cx(
//                       gridStyles['grid-item'],
//                       gridStyles[`grid-item--${image.gridPosition}`]
//                     )}
//                     style={{ order: image.gridPosition }}
//                     key={image.gridPosition}
//                     //
//                   >
//                     <NavLink
//                       to={{
//                         pathname: '/projekte/' + toptenProjects[i]._id
//                       }}
//                       params={{ id: toptenProjects[i]._id }}
//                       activeClassName="active"
//                       onClick={() =>
//                         this.props.getProjectById(toptenProjects[i]._id)
//                       }
//                     >
//                       <ProjectPreview
//                         project={toptenProjects[i]}
//                         image={image}
//                         position={image.gridPosition}
//                         isIE11={this.state.isIE11}
//                       />
//                     </NavLink>
//                   </div>
//                 )
//                 let rankInt = parseInt(image.gridPosition)
//                 let index = top10.indexOf(rankInt)
//                 if (index > -1) {
//                   top10.splice(index, 1)
//                 }
//               }
//             }
//           }
//         }

//         if (afterTenProjects !== undefined && afterTenProjects.length > 0) {
//           this.fillRemainingRanks(top10, afterTenProjects, projectList)
//         }
//         projectList.sort((a, b) => parseInt(a.key) - parseInt(b.key))

//         projectContent = (
//           <div className={styles['grid-container']}>
//             <div
//               className={cx(gridStyles['grid'], {
//                 [gridStyles['ie11']]: isIE11
//               })}
//             >
//               {projectList}
//             </div>
//           </div>
//         )
//       }
//     }

//     return (
//       <div className={styles.projects}>
//         <div className={cx(styles['project-grid'])}>{projectContent}</div>
//       </div>
//     )
//   }
// }

// Projects.propTypes = {
//   getAllProjects: PropTypes.func.isRequired,
//   getProjectsAfterTen: PropTypes.func.isRequired,
//   getProjectById: PropTypes.func.isRequired,
//   getGridTopTen: PropTypes.func.isRequired,
//   hasBackgroundImage: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   project: PropTypes.object.isRequired,
//   topten: PropTypes.object
// }

// const mapStateToProps = state => ({
//   project: state.project,
//   auth: state.auth
// })

// export default connect(
//   mapStateToProps,
//   {
//     getAllProjects,
//     getProjectsAfterTen,
//     getProjectById,
//     getGridTopTen,
//     hasBackgroundImage
//   }
// )(Projects)

// // export default Projects
