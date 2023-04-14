import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string;
  titleTo: string;
  createButtonLabel: string;
  createButtonTo: string;
  children: React.ReactNode
}

const TasksLayout = ({
  title,
  titleTo,
  createButtonLabel,
  createButtonTo,
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
        <Link to={routes[createButtonTo]()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> {createButtonLabel}
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TasksLayout
