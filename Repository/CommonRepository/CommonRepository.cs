using Model;
using Repository.DapperConfigure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Repository.CommonRepository
{
    public class CommonRepository :DALConfig, ICommonRepository
    {
        public readonly IDataAccessLayer _dah;
        public CommonRepository(IDataAccessLayer dataAccessLayer)
        {
            _dah = dataAccessLayer;
        }

        public async Task<List<FiscalYears>> GetAllFiscal()
        {
            string query = @"select * from fiscalyear as f";
            var user = await _dah.FetchDerivedModelAsync<FiscalYears>(query);
            return user;
        }

        public async Task<List<Province>> GetProvince()
        {
            string query = @"select * from province";
            var user = await _dah.FetchDerivedModelAsync<Province>(query);
            return user;
        }

        public async Task<List<District>> GetDistrictByProvinceIds(int[] provinceIds)
        {
            List<District> results = new List<District>();
            string districtids = string.Empty;
            foreach (int did in provinceIds)
            {
                districtids += did.ToString() + ",";
            }
            if (districtids.Length > 0)
            {
                districtids = districtids.Substring(0, districtids.Length - 1);
                using (IDbConnection db = GetDbConnection())
                {
                    var query = @"select * from district";
                    query += " where province_id in ";
                    query += "(" + districtids + ")";
                    results = await _dah.FetchDerivedModelAsync<District>(query);
                }
            }
            return results;
        }

        public async Task<List<Palika>> GetMultiplePalikaByMultipleDistrictIds(int[] districtIds)
        {
            List<Palika> results = new List<Palika>();
            string palikaids = string.Empty;
            foreach (int did in districtIds)
            {
                palikaids += did.ToString() + ",";
            }
            if (palikaids.Length > 0)
            {
                palikaids = palikaids.Substring(0, palikaids.Length - 1);
                using (IDbConnection db = GetDbConnection())
                {
                    var query = @"select * from palika";
                    query += " where district_id in ";
                    query += "(" + palikaids + ")";
                    results = await _dah.FetchDerivedModelAsync<Palika>(query);
                }
            }
            return results;
        }

        public async Task<List<ProvinceDistrictPalikaVM>> GetProvinceDistrictPalika()
        {
            string query = @"select * from public.get_province_district_palika()";
            var user = await _dah.FetchDerivedModelAsync<ProvinceDistrictPalikaVM>(query);
            return user;
        }

        public async Task<bool> UpdateProvince(int id, bool is_active)
        {
            string query = @"update province set is_active=@isActive where id=@Id ";
            var parameters = new{ isActive = is_active, Id = id  };
            var user = await _dah.FetchDerivedModelAsync<object>(query, parameters);
            return true;
        }

        public async Task<bool> UpdateDistrict(int id, bool is_active)
        {
            string query = @"update district set is_active=@isActive where id=@Id ";
            var parameters = new { isActive = is_active, Id = id };
            var user = await _dah.FetchDerivedModelAsync<object>(query, parameters);
            return true;
        }

        public async Task<bool> UpdatePalika(int id, bool is_active)
        {
            string query = @"update palika set is_active=@isActive where id=@Id ";
            var parameters = new { isActive = is_active, Id = id };
            var user = await _dah.FetchDerivedModelAsync<object>(query, parameters);
            return true;
        }

        public async Task<bool> LockoutForFiscalYear(int id, bool locked)
        {
            string query = @"update fiscalyear set locked=@Locked where id=@Id ";
            var parameters = new { Locked = locked, Id = id };
            var user = await _dah.FetchDerivedModelAsync<object>(query, parameters);
            return true;
        }

        public async Task<bool> LockoutForFiscalYearDetail(int id, bool locked)
        {
            string query = @"update fiscalyeardetail set locked=@Locked where id=@Id ";
            var parameters = new { Locked = locked, Id = id };
            var user = await _dah.FetchDerivedModelAsync<object>(query, parameters);
            return true;
        }

        public async Task<List<FiscalDetail>> GetAllFiscalDetail(int id)
        {
            string query = @"select * from fiscalyeardetail where fyid =@fyid";
            var parameters = new { fyid = id};
            var user = await _dah.FetchDerivedModelAsync<FiscalDetail>(query, parameters);
            return user;
        }
    }
}
