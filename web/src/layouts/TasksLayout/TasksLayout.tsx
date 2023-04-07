import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string;
  titleTo: string;
  tasksButtonLabel: string;
  bonusButtonLabel: string;
  tasksButtonTo: string;
  bonusButtonTo: string;
  children: React.ReactNode
}

const TasksLayout = ({
  title,
  titleTo,
  tasksButtonLabel,
  bonusButtonLabel,
  tasksButtonTo,
  bonusButtonTo,
  children,
}: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes[titleTo]()} className="rw-link">
            {title}
          </Link>
        </h1>
        <Link to={routes[bonusButtonTo]()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> {bonusButtonLabel}
        </Link>
        <Link to={routes[tasksButtonTo]()} className="rw-button rw-button-green">
          <div className='rw-button-icon'>+</div>{tasksButtonLabel}
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TasksLayout
