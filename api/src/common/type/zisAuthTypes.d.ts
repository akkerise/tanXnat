declare namespace Zis {
  type func = {
    id: string;
    subid: string;
    areaCode: string;
    funcInfo: string;
    funcInfoOrigin: {
      itemid: string;
      itemvalue: string;
    }[];
  };

  type AuthInfo = {
    status: {
      code: string;
      text: string;
    };
    result: {
      aid: string;
      authCycle: string;
      cid: string;
      domainApi: string;
      domainMap: string;
      domainStyle: string;
      domainWmts: string;
      domainWmtsJs: string;
      domainZipsApi: string;
      genreid: string;
      initLatitude: string;
      initLongitude: string;
      initMapScale: string;
      items: Item;
      kid: string;
      mapType: string;
      mapTypeEnc: string;
      polling: string;
      sid: string;
      usernm: string;
      versionCheckCycle: string;
    };
  };

  type Item = {
    func: func[];
    kid: string;
    mapType: string;
    mapTypeEnc: string;
    polling: string;
    sid: string;
    usernm: string;
    versionCheckCycle: string;
  };

  type GetByBuildingRes = {
    status: string;
    result: {
      info: {
        hit: number;
      };
      item: {
        zid: string;
        zid_attr: string;
        id: string;
        id_attr: string;
        building_name: string;
        name: string;
        name_read: string;
        name_read_through: string;
        post_code: string;
        address_code: string;
        address: string;
        building_type: number;
        building_top_floor_num: number;
        building_bottom_floor_num: number;
        position: number[];
        pastmap_id: string;
        pastmap_year: string;
        distance: string;
      }[];
    };
  };
}
