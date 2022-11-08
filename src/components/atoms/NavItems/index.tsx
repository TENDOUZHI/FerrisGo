import './index.scss'
import defaultImg from '@/assets/default.png'
import { ListMenu } from '../Effect/ListMenu'

export const NavItems = () => {

    return (
        <div className="navitems_setting_items">
            <div className="navitems_setting_items_title">
                <div className="navitems_setting_items_title_span">
                    导航栏选项设置
                </div>
                <div className="navitems_setting_items_title_add">
                    新增item
                </div>
            </div>

            <div className="navitems_setting_items_attr">
                <div className="navitems_setting_items_attr_icon">
                    <span>icon图片:</span>
                    <img src={defaultImg} alt="" />
                </div>
                <div className="navitems_setting_items_attr_icon">
                    <span>选中icon图片:</span>
                    <img src={defaultImg} alt="" />
                </div>
            </div>
            <div className="navitems_setting_items_attr">
                <div className="navitems_setting_items_attr_text">
                    <span>文本:</span>
                    <input type="text" name="" id="" />
                </div>
                <div className="navitems_setting_items_attr_path">
                    <span>页面路径:</span>
                    <ListMenu value={['wwwww', 'sssss', 'aaaaa']} type='path' left='865px' right='0px' top='575px' bottom='0' />
                </div>
            </div>

        </div>
    )
}