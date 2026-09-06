import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { PencilIcon, ShieldCheckIcon, BellIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useUpdatePassword, useUpdateProfile, useDeleteAccount } from '../../hooks/useSettings'
import { useUserProfile, useUpdateUserProfile } from '../../hooks/useUserProfile'
import { useAuth } from '../../Context/useAuth'

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20'
const errorInputClass =
  'w-full px-3 py-2 rounded-lg border border-red-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200'
const errorTextClass = 'text-xs text-red-600 mt-1'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9+\s-]{7,15}$/

export default function Settings() {
  // AUTH CONTEXT — LOGGED-IN USER + UPDATER TO SYNC HEADER/DROPDOWN AFTER SAVES
  const { user, updateUser } = useAuth()
  const userId = user?.id
  const isAdmin = user?.role === 'admin';

  // EXTENDED PROFILE DATA (BIO, PHONE, COURSE) FETCHED SEPARATELY FROM THE AUTH USER
  const { data: profile, isLoading: profileLoading } = useUserProfile(userId)
  const updateUserProfile = useUpdateUserProfile(userId)

  // MUTATIONS FOR PASSWORD, NAME/EMAIL, AND ACCOUNT DELETION
  const updatePassword = useUpdatePassword()
  const updateProfile = useUpdateProfile()
  const deleteAccount = useDeleteAccount()

  // COMBINED PROFILE FORM — NAME/EMAIL (ACCOUNT) + BIO/PHONE/COURSE (EXTENDED PROFILE)
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    course: '',
  })
  const [profileErrors, setProfileErrors] = useState({})

  // PASSWORD FORM STATE — OPTIONAL, ONLY VALIDATED/SUBMITTED IF THE USER TOUCHES IT
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [showPasswords, setShowPasswords] = useState(false)

  // NOTIFICATION TOGGLES — LOCAL UI STATE ONLY, NO BACKEND ENDPOINT PROVIDED YET
  const [notifications, setNotifications] = useState({
    emailDigests: true,
    projectComments: true,
    eventReminders: true,
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // POPULATE NAME/EMAIL FROM THE LOGGED-IN USER
  useEffect(() => {
    if (user) {
      setProfileForm((f) => ({
        ...f,
        name: user.name ?? '',
        email: user.email ?? '',
      }))
    }
  }, [user])

  // POPULATE BIO/PHONE/COURSE ONCE THE EXTENDED PROFILE LOADS
  useEffect(() => {
    if (profile) {
      setProfileForm((f) => ({
        ...f,
        bio: profile.bio ?? '',
        phone: profile.phone ?? '',
        course: profile.course ?? '',
      }))
    }
  }, [profile])

  const toggleNotification = (key) => {
    setNotifications((n) => ({ ...n, [key]: !n[key] }))
  }

  // VALIDATES THE PROFILE SECTION (NAME/EMAIL/BIO/PHONE/COURSE)
  const validateProfile = () => {
    const errors = {}
    if (!profileForm.name.trim()) {
      errors.name = 'Name is required'
    } else if (profileForm.name.trim().length < 2) {
      errors.name = 'Name is too short'
    }
    if (!profileForm.email.trim()) {
      errors.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(profileForm.email)) {
      errors.email = 'Enter a valid email address'
    }
    if (profileForm.bio.length > 300) {
      errors.bio = 'Bio must be under 300 characters'
    }
    if (profileForm.phone && !PHONE_REGEX.test(profileForm.phone)) {
      errors.phone = 'Enter a valid phone number'
    }
    if (profileForm.course.length > 100) {
      errors.course = 'Course name is too long'
    }
    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  // VALIDATES THE PASSWORD SECTION — ONLY REQUIRED IF THE USER IS ACTUALLY CHANGING IT
  const isChangingPassword = () =>
    passwordForm.current_password || passwordForm.password || passwordForm.password_confirmation

  const validatePassword = () => {
    if (!isChangingPassword()) {
      setPasswordErrors({})
      return true
    }

    const errors = {}
    if (!passwordForm.current_password) {
      errors.current_password = 'Enter your current password'
    }
    if (passwordForm.password.length < 6) {
      errors.password = 'New password must be at least 6 characters'
    }
    if (passwordForm.password && passwordForm.password === passwordForm.current_password) {
      errors.password = 'New password must be different from the current password'
    }
    if (passwordForm.password_confirmation !== passwordForm.password) {
      errors.password_confirmation = 'Passwords do not match'
    }
    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  // SINGLE "SAVE CHANGES" HANDLER — VALIDATES AND SUBMITS EVERYTHING TOGETHER
  const handleSaveAll = async () => {
    const profileValid = validateProfile()
    const passwordValid = validatePassword()

    if (!profileValid || !passwordValid) {
      toast.error('Please fix the highlighted fields')
      return
    }

    try {
      // NAME/EMAIL
      const accountRes = await updateProfile.mutateAsync({
        name: profileForm.name,
        email: profileForm.email,
      })

      // BIO/PHONE/COURSE
      const profileRes = await updateUserProfile.mutateAsync({
        bio: profileForm.bio,
        phone: profileForm.phone,
        course: profileForm.course,
      })

      // PASSWORD — ONLY IF THE USER FILLED IT IN
      if (isChangingPassword()) {
        await updatePassword.mutateAsync(passwordForm)
        setPasswordForm({ current_password: '', password: '', password_confirmation: '' })
      }

      // SYNC AUTH CONTEXT SO THE HEADER/DROPDOWN REFLECTS THE CHANGES IMMEDIATELY
      updateUser({
        name: accountRes?.new_name ?? profileForm.name,
        email: accountRes?.new_email ?? profileForm.email,
        bio: profileRes?.bio ?? profileForm.bio,
        phone: profileRes?.phone ?? profileForm.phone,
        course: profileRes?.course ?? profileForm.course,
      })

      toast.success('Settings saved')
    } catch (err) {
      // INDIVIDUAL REQUEST ERRORS ALREADY SURFACE VIA THE apiClient TOAST INTERCEPTOR
    }
  }

  const isSaving =
    updateProfile.isPending || updateUserProfile.isPending || updatePassword.isPending

  const handleDeleteAccount = () => {
    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      },
    })
  }

  return (
    <div>
      {/* PAGE HEADER — TITLE + SINGLE GLOBAL SAVE BUTTON */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="text-xs font-semibold tracking-wide text-muted uppercase">
            Account & Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-dark mt-1">Settings</h1>
          <p className="text-sm text-muted mt-1">
            Manage your profile, security, preferences, and account.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving || profileLoading}
          className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
        >
          {isSaving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {profileForm.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase() || 'U'}
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border border-black/10 text-dark hover:bg-black/5 transition-colors"
              >
                <PencilIcon className="size-3.5" />
                Change photo
              </button>
            </div>

            <h2 className="text-lg font-bold text-dark mb-1">Profile</h2>
            <p className="text-sm text-muted mb-5">
              Only you can edit your profile. Other community profiles are read-only.
            </p>

            {profileLoading ? (
              <p className="text-sm text-muted">Loading profile…</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className={profileErrors.name ? errorInputClass : inputClass}
                  />
                  {profileErrors.name && <p className={errorTextClass}>{profileErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className={profileErrors.email ? errorInputClass : inputClass}
                  />
                  {profileErrors.email && <p className={errorTextClass}>{profileErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">Bio</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))}
                    rows={3}
                    className={profileErrors.bio ? errorInputClass : inputClass}
                    placeholder="A short bio about yourself"
                  />
                  {profileErrors.bio && <p className={errorTextClass}>{profileErrors.bio}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                      className={profileErrors.phone ? errorInputClass : inputClass}
                    />
                    {profileErrors.phone && (
                      <p className={errorTextClass}>{profileErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-1.5">
                      Course
                    </label>
                    <input
                      type="text"
                      value={profileForm.course}
                      onChange={(e) => setProfileForm((f) => ({ ...f, course: e.target.value }))}
                      className={profileErrors.course ? errorInputClass : inputClass}
                      placeholder="e.g. Computer Science"
                    />
                    {profileErrors.course && (
                      <p className={errorTextClass}>{profileErrors.course}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DANGER ZONE — ACCOUNT DELETION */}
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-red-600">Delete account</h2>
            </div>
            <p className="text-sm text-muted mb-5">This permanently deletes your profile and content.</p>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-sm font-semibold px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete account
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* PASSWORD & SECURITY CARD */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheckIcon className="size-5 text-primary" />
              <h2 className="text-lg font-bold text-primary">Password & security</h2>
            </div>
            <p className="text-sm text-muted mb-5">Keep your account protected.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  Current password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.current_password}
                  onChange={(e) =>
                    setPasswordForm((f) => ({ ...f, current_password: e.target.value }))
                  }
                  className={passwordErrors.current_password ? errorInputClass : inputClass}
                />
                {passwordErrors.current_password && (
                  <p className={errorTextClass}>{passwordErrors.current_password}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  New password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.password}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="At least 6 characters"
                  className={passwordErrors.password ? errorInputClass : inputClass}
                />
                {passwordErrors.password && (
                  <p className={errorTextClass}>{passwordErrors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  Confirm new password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.password_confirmation}
                  onChange={(e) =>
                    setPasswordForm((f) => ({ ...f, password_confirmation: e.target.value }))
                  }
                  className={passwordErrors.password_confirmation ? errorInputClass : inputClass}
                />
                {passwordErrors.password_confirmation && (
                  <p className={errorTextClass}>{passwordErrors.password_confirmation}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowPasswords((s) => !s)}
                className="text-sm font-semibold text-primary hover:underline"
              >
                {showPasswords ? 'Hide passwords' : 'Show passwords'}
              </button>
            </div>
          </div>

          {/* NOTIFICATIONS CARD — LOCAL STATE ONLY (NO ENDPOINT WIRED UP YET) */}
          {/* NOTIFICATIONS CARD — ADMIN ONLY */}
          {isAdmin && (
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-1">
                <BellIcon className="size-5 text-primary" />
                <h2 className="text-lg font-bold text-primary">Notifications</h2>
              </div>
              <p className="text-sm text-muted mb-5">Choose what you want to hear about.</p>

              <div className="divide-y divide-black/5">
                {[
                  { key: 'emailDigests', label: 'Email digests' },
                  { key: 'projectComments', label: 'Project comments' },
                  { key: 'eventReminders', label: 'Event reminders' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between py-3">
                    <span className="text-sm font-semibold text-dark">{label}</span>
                    <button
                      type="button"
                      onClick={() => toggleNotification(key)}
                      className={`relative w-10 h-6 rounded-full transition-colors ${
                        notifications[key] ? 'bg-primary' : 'bg-black/10'
                      }`}
                      aria-pressed={notifications[key]}
                    >
                      <span
                        className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                          notifications[key] ? 'translate-x-[18px]' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => !deleteAccount.isPending && setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-dark mb-2">Delete your account?</h3>
            <p className="text-sm text-muted mb-6">
              This will permanently delete your account, projects, and activity. This can't be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteAccount.isPending}
                className="text-sm font-semibold px-4 py-2 rounded-lg text-dark hover:bg-black/5 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteAccount.isPending}
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-40"
              >
                {deleteAccount.isPending ? 'Deleting…' : 'Delete account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}