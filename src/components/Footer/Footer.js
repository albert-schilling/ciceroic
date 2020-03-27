import React from 'react'
import ProfileButton from '../Inputs/Icons/ProfileButton'
import RecordIcon from '../Inputs/Icons/RecordIcon'
import IconProfile from '../Inputs/Icons/IconProfile'

export default function Footer({
  user = {},
  activePage = '',
  setActivePage = () => {},
}) {
  return (
    <>
      {user._id && (
        <footer role="navigation" aria-label="Main">
          {activePage === '' && (
            <RecordIcon callback={() => setActivePage('/upload')} />
          )}
          {activePage === '' && (
            <IconProfile callback={() => setActivePage('/settings')} />
          )}
        </footer>
      )}
    </>
  )
}
