import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'umi'
import { connect } from 'umi'
import { MyLayout, GlobalFooter } from 'components'
import { FloatButton, Layout } from 'antd';
import { config } from 'utils'
import { MENU } from 'utils/constant'
import styles from './PrimaryLayout.less'
import store from 'store'

const { Content } = Layout
const { Header, Bread, Sider } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }

  render() {
    const { app, dispatch, children } = this.props
    const { theme, collapsed, notifications } = app
    const user = store.get('user') || {}
    const { onCollapseChange } = this

    // Localized route name.

    const newRouteList = []


    const headerProps = {
      collapsed,
      notifications,
      onCollapseChange,
      avatar: user.avatar,
      username: user.username,
      fixed: config.fixedHeader,
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
    }

    const siderProps = {
      theme,
      menus: MENU,
      collapsed,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }

    return (
      (<Fragment>
        <Layout>
          <Sider {...siderProps} />
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Content className={styles.content}>
              <Bread menus={MENU} />
              { children }
            </Content>
            <FloatButton.BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout')}
            />
            <GlobalFooter
              className={styles.footer}
              copyright={config.copyright}
            />
          </div>
        </Layout>
      </Fragment>)
    );
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
